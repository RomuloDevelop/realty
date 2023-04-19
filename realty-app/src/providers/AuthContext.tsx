import { User } from '@prisma/client'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

type AuthUser = User | null

interface IAuth {
  user: AuthUser
  updateUser: (user: User | null) => void
}

const Auth = createContext<IAuth>({
  user: null,
  updateUser: () => {},
})

export const useAuth = () => {
  const context = useContext(Auth)

  if (!context) {
    throw new Error('There is no Auth provider available')
  }

  return context
}

const useAuthService = (): IAuth => {
  const [user, setUser] = useState<AuthUser>(null)
  const updateUser = useCallback((user: AuthUser) => {
    setUser(user)
  }, [])

  return {
    updateUser,
    user,
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthService()
  return <Auth.Provider value={auth}>{children}</Auth.Provider>
}
