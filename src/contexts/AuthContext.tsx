import { createContext, ReactNode, useCallback, useState } from "react";
import { api } from "../services/api";
import { removeToken, setRefreshToken, setToken } from "../utils/Token";
import Router from 'next/router'

interface AuthProviderProps{
  children: ReactNode;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => void;
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps){
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)

  const signIn = useCallback(async(email: string, password: string) => {
    const { data } = await api.post('/login', { email, password })
    localStorage.setItem('@CarpeDiemUsername', data.user.name)

    setToken(data.token)
    setIsAuthenticated(true)

    api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${data.token}`
      return config
    })
  
    return data
  },[])

  function logout(){
    removeToken()
    Router.push('/')
  }

  return(
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

