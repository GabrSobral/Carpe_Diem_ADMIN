import Image from 'next/image'
import Loading from 'react-loading'

import configSVG from '../../images/config.svg'
import changeSVG from '../../images/change.svg'
import trashSVG from '../../images/trash.svg'
import ViewSVG from '../../images/view.svg'

import styles from './styles.module.scss'
import { api } from '../../services/api'
import { useActivity } from '../../hooks/useActivity'
import { useState } from 'react'
import { usePage } from '../../hooks/usePage'
import { AnimatePresence } from 'framer-motion'
import { WarningDeleteModal } from '../WarningDeleteModal'

interface ConfigButtonProps{
  view?: boolean;
}

export function ConfigButton({ view = false }: ConfigButtonProps){
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleSetPage } = usePage()
  const { activity, handleClearSelectActivity, handleRemoveActivityFromList } = useActivity()
  const [ isModalVisible, setIsModalVisible ] = useState(false)

  async function DeleteActivity(){
    setIsLoading(true)
    await api.delete(`/activity/delete/${activity?.id}`)
    .then(() => {
      handleRemoveActivityFromList()
      handleClearSelectActivity()
      setIsLoading(false)
    })
  }

  return(
    <div className={styles.container}>
      <WarningDeleteModal
        closeModal={() => setIsModalVisible(false)}
        handleRemoveFromList={DeleteActivity}
        name={activity?.title || ''}
        title="atividade"
        description="Ao excluir esta atividade, você estará excluindo permanentemente todas
        as suas dependências..."
        isVisible={isModalVisible}
      />
      <div className={styles.relative}>
        <div className={styles.config_menu}>
          {
            !view ? (
              <button type="button" onClick={() => handleSetPage("ActivityUpdate")}>
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

          <button type="button" className={styles.delete_button} onClick={() => setIsModalVisible(true)}>
            {
              isLoading ? (
                <Loading type="spin" width={24} height={24} color="#616BC5"/>
              ) : (
                <>
                  Deletar
                  <Image src={trashSVG} alt="Botão de alterar atividade"/>
                </>
              )
            }
          
          </button>
        </div>

        <button type="button" className={styles.config_button}>
          <Image src={configSVG} alt="Botão de configuração"/>
        </button>
      </div>
    </div>
  )
}