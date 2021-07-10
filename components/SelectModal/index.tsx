import { SelectModalButton } from '../SelectModalButton'

import Image from 'next/image'
import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'

import { useModal } from '../../hooks/useModal'

import styles from './styles.module.scss'

interface ModalProps{
  type: 'category' | 'archive';
}

export function SelectModal({ type }: ModalProps){
  const { handleModalCategory, handleModalArchives } = useModal()

  console.log(type)

  function handleModalClose(){
    if(type === 'category'){ handleModalCategory() }
    if(type === 'archive'){ handleModalArchives() }
  }

  return(
    <div className={styles.background}>

      <div className={styles.popup}>
        <div className={styles.title}>
          {
            type === 'category' ? (
              <span>Selecione uma categoria</span>
            ) : (
              <span>Selecione um arquivo</span>
            )
          }
          
        </div>

        <main>
          <SelectModalButton title="Música"/>
          <SelectModalButton title="Esporte"/>
        </main>

        <nav className={styles.button_container} onClick={handleModalClose}>
          <button type="button">
            <Image src={xSVG} alt="Cancelar"/>
            Cancelar
          </button>

          <button type="button" onClick={handleModalClose}>
            <Image src={checkSVG} alt="Cancelar"/>
            Concluir
          </button>
        </nav>
      </div>

    </div>
  )
}