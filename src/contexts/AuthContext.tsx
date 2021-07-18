import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import { removeToken, setToken } from "../utils/Token";
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

  async function signIn(email: string, password: string){
    const { data } = await api.post('/login', { email, password })
    localStorage.setItem('@CarpeDiemUsername', data.user.name)

    setToken(data.token)
    setIsAuthenticated(true)
  
    return data
  }

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

