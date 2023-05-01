import { User } from '../types'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthUser = User | null

interface IAuth {
  user: AuthUser
  updateUser: (user: User | null) => void
  logout: () => void
}

const Auth = createContext<IAuth>({
  user: null,
  updateUser: () => {},
  logout: () => {},
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
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    updateUser(null)
  }, [updateUser])

  useEffect(() => {
    const preservedUser = localStorage.getItem('user')
    if (preservedUser) setUser(JSON.parse(preservedUser))
  }, [])

  return {
    updateUser,
    user,
    logout,
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthService()
  return <Auth.Provider value={auth}>{children}</Auth.Provider>
}
