import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loading from 'react-loading'
import LottieView from 'react-lottie'

import { LoginInput } from '../components/LoginInput'

import enter from '../images/enter.svg'
import logo from '../images/logo.svg'
import HomeAnimation from '../images/HomeAnimation.json'

import styles from '../styles/styles.module.scss'
import { useAuth } from '../hooks/useAuth'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Login() {
  const { signIn } = useAuth()
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
    try{
      const user = await signIn(email, password)
      console.log(user)
      setIsLoading(false)
      push('/Activities')
    }catch(error: any){
      setMessage(error.response.data.error)
      setPassword('')
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container_SignInPage}>
      <aside className={styles.banner}>
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" />
        </div>
        <LottieView
          width={900}
          isClickToPauseDisabled
          options={{
            animationData: HomeAnimation,
            loop: true,
            autoplay: true,
            
          }}
        />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@CarpeDiem-Token'] : token } = parseCookies(ctx)

  if(token){
    return {
      redirect: {
        destination: '/Activities',
        permanent: false,
      }
    }
  }
  return{
    props: {

    }
  }
}
