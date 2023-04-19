import { useCallback, useState } from 'react'
import _ from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { InferType } from 'yup'
import {
  CreateUserParams,
  UpdateUserParams,
  createUser,
  getUser,
  updateUser,
} from '../../../../services/users'
import Schema from './schema'
import { User } from '@prisma/client'

const useUserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const {
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    register,
    control,
  } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
  })
  const [data, setData] = useState<User & { role: string }>()

  const fillForm = useCallback(
    (data: User) => {
      _.forOwn(data, (value, key) => {
        setValue(key as any, value)
      })
    },
    [setValue]
  )

  const { isFetching } = useQuery(['user'], () => getUser(parseInt(id)), {
    onSuccess: ({ role, ...user }) => {
      fillForm(user)
      setData({ role, ...user })
    },
    onError: (error) => {
      toast.error('Hubo un error al solicitar data de usuario')
      console.error(error)
    },
  })

  const { mutate, isLoading: isLoadingRequest } = useMutation(
    (user: CreateUserParams | UpdateUserParams) => {
      if (id) return updateUser({ ...user, id: parseInt(id) })
      else return createUser(user)
    },
    {
      onSuccess: ({ role, ...user }) => {
        fillForm(user)
        setData({ role, ...user })
        toast.success(`Usuario ${id ? 'actualizado' : 'creado'} exitosamente`)
      },
      onError: (err) => {
        console.error(err)
        toast.error('Hubo un problema al actualizar usuario')
      },
    }
  )

  const send = useCallback(() => {
    const values = getValues()
    mutate(values)
  }, [getValues, mutate])

  return {
    isLoading: isFetching,
    isLoadingRequest,
    data,
    errors,
    register,
    handleSubmit,
    send,
    control,
  }
}

export default useUserDetail
