import { useState, useEffect } from 'react'
import LottieView from 'react-lottie'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import Loading from 'react-loading'
import { motion, AnimatePresence } from 'framer-motion'

import LogoutAnimation from '../../images/logout.json'
import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'

import styles from './styles.module.scss'
import { useAuth } from '../../hooks/useAuth'
import { ModalContainer } from '../ModalContainer'

interface WarningDeleteModal{
  closeModal: () => void;
  isVisible: boolean;
}

let location: Element

export function ExitModal({ closeModal, isVisible }: WarningDeleteModal){
  const [ isLoading, setIsLoading ] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    location = document.querySelector('#modal')|| document.body
  },[])

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
              <LottieView
                height={226}
                options={{
                  animationData: LogoutAnimation,
                  autoplay: true,
                  loop:false,
                }}
              />
              <h2>Volte sempre...</h2>

              <div className={styles.descriptionDeleteModal}>
                <span>Você tem certeza de que quer sair?</span>
              </div>

              <div className={styles.button_container_modal}>
                <button 
                  type="button" 
                  disabled={isLoading}
                  onClick={() => {
                    logout()
                    setIsLoading(true)
                  }}
                >
                  {
                    isLoading ? <Loading type="spin" color="#fff" height={24} width={24}/>
                    : (
                      <>
                        <Image src={checkSVG} alt="Imagem de confirmação" />
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