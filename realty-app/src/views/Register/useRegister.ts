import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Schema from './schema'
import { useMutation } from '@tanstack/react-query'
import { Register, register as registerUser } from '../../services/auth'
import { InferType } from 'yup'

const useRegister = () => {
  const {
    getValues,
    formState: { errors },
    handleSubmit: handleSubmitCore,
    register,
    control,
    setError,
  } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
  })

  const { mutate, isLoading } = useMutation(
    (params: Register) => registerUser(params),
    {
      onSuccess: (data) => {
        console.log('onSuccess', data)
      },
      onError: (error: any) => {
        console.log(error)
        if (error.fields) {
          error.fields.forEach((fieldKey: string) => {
            console.log(fieldKey)
            setError(fieldKey as any, { message: 'Este campo ya existe' })
          })
          return
        }

        console.error(error)
      },
    }
  )

  const send = useCallback(() => {
    const {
      email,
      password,
      phone,
      address,
      firstName: first_name,
      lastName: last_name,
    } = getValues()
    mutate({ email, password, phone, address, first_name, last_name })
  }, [mutate, getValues])

  const handleSubmit = useMemo(() => handleSubmitCore(send), [send])

  return {
    isLoading,
    handleSubmit,
    errors,
    register,
    control,
  }
}

export default useRegister
