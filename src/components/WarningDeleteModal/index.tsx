import { useState } from 'react'
import Image from 'next/image'
import Loading from 'react-loading'
import { motion, AnimatePresence } from 'framer-motion'

import deleteSVG from '../../images/delete.svg'
import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'

import styles from './styles.module.scss'
import { ModalContainer } from '../ModalContainer'

interface WarningDeleteModal{
  name: string;
  handleRemoveFromList: () => void | Promise<void>;
  closeModal: () => void;
  title: "atividade" | "categoria" | 'pergunta' | "arquivo";
  description: string;
  isVisible: boolean;
}

export function WarningDeleteModal(
  { name, handleRemoveFromList, closeModal, title, description, isVisible }: WarningDeleteModal){
  const [ isLoading, setIsLoading ] = useState(false)
  
  return(
    <ModalContainer selector="#modal">
      <AnimatePresence exitBeforeEnter>
        { isVisible &&
          <motion.div 
            className={styles.Modalbackground}
            layout
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className={styles.modal_popup}
              layout
              initial={{ opacity: 0, scale: 0.8}}
              animate={{ opacity: 1, scale: 1}}
              exit={{ opacity: 0, scale: 0}}
              transition={{ duration: 0.2 }}
            >
              <Image 
                src={deleteSVG} 
                alt="Imagem de lixeira"
                height={226}
              />
              <h2>
                Você tem certeza de que quer excluir a {title}: <span>{name}</span>?
              </h2>

              <div className={styles.descriptionDeleteModal}>
                <span>
                  {description}<strong>Você quer prosseguir?</strong>
                </span>
              </div>
              <div className={styles.button_container_modal}>
                <button 
                  type="button" 
                  disabled={isLoading}
                  onClick={() => {
                    handleRemoveFromList()
                    setIsLoading(true)
                  }}
                >
                  {
                    isLoading ? <Loading type="spin" color="#fff" height={24} width={24}/>
                    : (
                      <>
                        <Image 
                          src={checkSVG} 
                          alt="Imagem de confirmação"
                        />
                        Sim
                      </>
                    )
                  }
                </button>
                <button type="button" onClick={closeModal}>
                  <Image src={xSVG} alt="Imagem de deleção"/>
                  Não
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </ModalContainer>
  )
}