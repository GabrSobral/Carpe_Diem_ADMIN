import Image from 'next/image'

import configSVG from '../../images/config.svg'
import changeSVG from '../../images/change.svg'
import trashSVG from '../../images/trash.svg'
import ViewSVG from '../../images/view.svg'

import styles from './styles.module.scss'

interface ConfigButtonProps{
  view?: boolean;
}

export function ConfigButton({ view = false }: ConfigButtonProps){

  return(
    <div className={styles.container}>
      <div className={styles.relative}>
      <div className={styles.config_menu}>

        {
          !view ? (
            <button type="button">
              Alterar 
              <Image src={changeSVG} alt="Botão de alterar atividade"/>
            </button>
          ) : (
            <button type="button">
              Visualizar
              <Image src={ViewSVG} alt="Botão de alterar atividade"/>
            </button>
          )
        }

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