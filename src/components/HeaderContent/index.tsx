import Image from 'next/image'

import plusSVG from '../../images/plus.svg'


import styles from './styles.module.scss'
import { usePage } from '../../hooks/usePage'
import { useEffect, useState } from 'react'

interface HeaderContentProps {
  title?: string;
}

export function HeaderContent({title}: HeaderContentProps){
  const { handleSetPageClearingState } = usePage()
  const [ name, setName ] = useState<string | null>('')

  useEffect(() =>{ 
    const username = localStorage.getItem('@CarpeDiemUsername')
    setName(username)

  },[])
  return(
    <header className={styles.container}>
      <div>
        <span>Olá {name}</span>
      </div>

      {
      title ? <h1 className={styles.title}>{title}</h1>
      : (
        <button type='button' onClick={() => handleSetPageClearingState("ActivityCreate")}>
          Criar atividade
          <Image src={plusSVG} alt="Icone de adicionar"/>
        </button>
      )
      }
    </header>
  )
}