import { Paginator, User } from '../types'
import { get, post, put } from '../utils/api'
import getRoleDescription from '../utils/helpers/getRoledescription'

export type CreateUserParams = Omit<User, 'id' | 'password'>
export type UpdateUserParams = Omit<User, 'password'>

export const getUsers = async (params: Paginator) => {
  const { data } = await get<User[]>({
    url: 'users',
    params,
  })

  return data.map((item) => ({
    ...item,
    role: getRoleDescription(item.roleId),
  }))
}

export const getUser = async (id: number) => {
  const { data } = await get<User>({
    url: `users/${id}`,
  })

  return { ...data, role: getRoleDescription(data.roleId) }
}

export const createUser = async (body: CreateUserParams) => {
  const { data } = await post<User>({
    url: 'users',
    body,
  })

  return { ...data, role: getRoleDescription(data.roleId) }
}

export const updateUser = async (body: UpdateUserParams) => {
  const { data } = await put<User>({
    url: 'users',
    body,
  })

  return { ...data, role: getRoleDescription(data.roleId) }
}
