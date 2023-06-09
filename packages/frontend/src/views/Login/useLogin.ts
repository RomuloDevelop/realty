import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Schema from './schema'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/auth'
import { InferType } from 'yup'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../providers/AuthContext'
import { Error } from '../../types'

const useLogin = () => {
  const history = useHistory()
  const { updateUser } = useAuth()
  const {
    getValues,
    formState: { errors },
    handleSubmit: handleSubmitCore,
    setError,
    register,
  } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
  })

  const { mutate, isLoading } = useMutation(
    (params: { email: string; password: string }) => login(params),
    {
      onSuccess: (data) => {
        updateUser(data)
        history.push('/my-account')
      },
      onError: (error: Error) => {
        console.error(error)
        if (error.statusCode === 401) {
          setError('email', { message: 'Correo o contraseña incorrectos' })
          return
        }

        setError('email', { message: 'Hubo un error al solicitar sus datos' })
      },
    }
  )

  const send = () => {
    const { email, password } = getValues()
    mutate({ email, password })
  }

  return {
    isLoading,
    handleSubmit: handleSubmitCore(send),
    send,
    errors,
    register,
  }
}

export default useLogin
