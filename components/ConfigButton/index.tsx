import Image from 'next/image'

import configSVG from '../../images/config.svg'
import changeSVG from '../../images/change.svg'
import trashSVG from '../../images/trash.svg'

import styles from './styles.module.scss'

export function ConfigButton(){
  return(
    <div className={styles.container}>
      <div className={styles.relative}>
      <div className={styles.config_menu}>
        <button type="button">
          Alterar 
          <Image src={changeSVG} alt="Botão de alterar atividade"/>
        </button>

        <button type="button" className={styles.delete_button}>
          Deletar 
          <Image src={trashSVG} alt="Botão de alterar atividade"/>
        </button>
      </div>

      <button type="button" className={styles.config_button}>
        <Image src={configSVG} alt="Botão de configuração"/>
      </button>
      </div>
    </div>
  )
}