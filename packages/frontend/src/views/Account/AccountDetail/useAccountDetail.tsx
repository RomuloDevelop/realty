import { useCallback, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { InferType } from 'yup'
import { useAuth } from '../../../providers/AuthContext'
import { updateAccount } from '../../../services'
import Schema from './schema'

const useAccountDetail = () => {
  const { user: actualInfo, updateUser } = useAuth()

  const {
    handleSubmit,
    setValue,
    setError,
    getValues,
    register,
    formState: { errors },
    control,
  } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
  })

  const { mutate: update, isLoading } = useMutation(updateAccount, {
    onSuccess: ({ data }) => {
      toast.success('Tus datos fueron actualizados')
      updateUser(data)
    },
    onError: (error) => {
      console.error(error)
      toast.error('Hubo un error al momento de actualizar tus datos')
    },
  })

  const send = useCallback(() => {
    if (!actualInfo) return
    const { confirmPassword, ...user } = getValues()
    if (user.password && user.password.length < 8) {
      setError('password', {
        message: 'Mínimo 8 caracteres',
      })
    }
    update({
      ...user,
      password: user.password || null,
      actualPassword: user.actualPassword || undefined,
      id: actualInfo.id,
    })
  }, [actualInfo, getValues, setError, update])

  useEffect(() => {
    if (!actualInfo) return

    setValue('first_name', actualInfo.first_name)
    setValue('last_name', actualInfo.last_name)
    setValue('address', actualInfo.address)
    setValue('email', actualInfo.email)
    setValue('phone', actualInfo.phone)
  }, [setValue, actualInfo])

  return {
    handleSubmit,
    isLoading,
    register,
    send,
    errors,
    control,
  }
}

export default useAccountDetail
