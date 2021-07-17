import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loading from 'react-loading'

import { LoginInput } from '../components/LoginInput'

import enter from '../images/enter.svg'
import logo from '../images/logo.svg'
import { api } from '../services/api'
import { setToken } from '../utils/Token'

import styles from '../styles/styles.module.scss'

export default function Login() {
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ isFilled, setIsFilled ] = useState<boolean>(false)
  const { push, prefetch } = useRouter()

  function handleSetEmail(value: string){ setEmail(value) }
  function handleSetPassword(value: string){ setPassword(value) }

  useEffect(() => { prefetch('/Activities') },[prefetch])

  useEffect(() => {
    email && password ? setIsFilled(true) : setIsFilled(false)
  },[ email, password ])

  async function handleSubmit(event: FormEvent){    
    event.preventDefault()
    setIsLoading(true)
    api.post('/login', { email, password }).then(({ data }) => {
      localStorage.setItem('@CarpeDiemUsername', data.user.name)
      setToken(data.token)
      setIsLoading(false)
      push('/Activities')
    }).catch((error) => {
      setMessage(error.response.data.error)
      setPassword('')
      setIsLoading(false)
    })
  }

  return (
    <div className={styles.container}>
      <aside className={styles.banner}>
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" />
        </div>
      </aside>

      <main>
        <div>
          <h2>Faça login para que <br/>possamos ajudá-lo da <br/>melhor forma</h2>
        
          <form onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <LoginInput 
                title="Insira seu email" 
                type="email" 
                setValue={handleSetEmail}
                value={email}
              />
              <LoginInput 
                title="Insira sua senha" 
                type="password" 
                setValue={handleSetPassword}
                value={password}
              />
            </div>
            {
              message && ( <span className={styles.error_message}>{message}</span> )
            }
            <div className={styles.remember_forgot_password}>
              <div>
                <input type="checkbox" name="remember" value="remember" />
                <label htmlFor="remember">Lembrar de mim</label>
              </div>
              <a href="#">Esqueci minha senha</a>
            </div>

            <button type='submit' disabled={isLoading || !isFilled}>
              {
                isLoading ? (
                  <Loading type="spin" width={26} height={26}/>
                ) : (
                  <>
                  <Image src={enter} alt="Icone de login" />
                  Entrar
                  </>
                )
              }
              
            </button>
          </form>

        </div>
      </main>
    </div>
  )
}
