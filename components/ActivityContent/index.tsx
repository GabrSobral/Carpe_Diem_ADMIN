import Image from 'next/image'

import styles from './styles.module.scss'

export function ActivityContent(){
  return(
    <div className={styles.container}>
      <header>
        <div>
          <span>Olá Gabriel</span>
        </div>

        <button type="button">
          Criar atividade

          <Image src={} alt="Icone de adicionar"/>
        </button>
      </header>
    </div>
  )
}