import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Schema from './schema'
import { useMutation } from '@tanstack/react-query'
import { Register, register as registerUser, login } from '../../services/auth'
import { InferType } from 'yup'
import { useHistory } from 'react-router-dom'

const useRegister = () => {
  const {
    getValues,
    formState: { errors },
    handleSubmit,
    register,
    control,
    setError,
  } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
  })
  const history = useHistory()

  const { mutate: loginFn, isLoading: isLoadingLogin } = useMutation(
    (params: { email: string; password: string }) => login(params),
    {
      onSuccess: () => {
        history.push('/')
      },
      onError: (error: Error) => {
        console.error(error)
        history.push('/login')
      },
    }
  )

  const { mutate, isLoading } = useMutation(
    (params: Register) => registerUser(params),
    {
      onSuccess: (_, { email, password }) => {
        loginFn({ email, password: password as string })
      },
      onError: (error: any) => {
        if (error.fields) {
          error.fields.forEach((fieldKey: string) => {
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

  return {
    isLoading: isLoading || isLoadingLogin,
    send,
    handleSubmit,
    errors,
    register,
    control,
  }
}

export default useRegister
