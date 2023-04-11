import { User } from '@prisma/client'
import { errorCodes } from '../constants'
import { post } from '../utils/api'
import { TokenUtils } from '../utils/tokenUtils'

export interface Login {
  access_token: string
}

export interface Register extends Omit<User, 'roleId' | 'id'> {}

const BASE_URL = 'auth'

export const login = async (body: { email: string; password: string }) => {
  const { data } = (await post({
    url: `/${BASE_URL}/login`,
    body,
  })) as { data: Login }

  TokenUtils.setToken(data.access_token)
}

export const register = async (body: Register) => {
  try {
    return await post({
      url: `/${BASE_URL}/register`,
      body,
    })
  } catch (e: any) {
    if (e.data && e.data.code === errorCodes.uniqueConstraint) {
      throw {
        fields: e.data.meta.target as string[],
      }
    }
    throw e
  }
}
