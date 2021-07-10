import Image from 'next/image'

import plusSVG from '../../images/plus.svg'

import Link from 'next/link'

import styles from './styles.module.scss'

interface HeaderContentProps {
  title?: string;
}

export function HeaderContent({title}: HeaderContentProps){
  return(
    <header className={styles.container}>
      <div>
        <span>Olá Gabriel</span>
      </div>

      {
      title ? <h1 className={styles.title}>{title}</h1>
      : (
        <Link href="/Activities/CreateActivity">
          <a>
            Criar atividade
            <Image src={plusSVG} alt="Icone de adicionar"/>
          </a>
        </Link>
      )
      }
    </header>
  )
}