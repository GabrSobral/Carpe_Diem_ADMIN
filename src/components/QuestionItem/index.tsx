import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import trashSVG from '../../images/trash.svg'
import { Question } from '../../@types/Activity'

import { SelectButton } from '../SelectButton'
import { WarningDeleteModal } from '../WarningDeleteModal'

import styles from './styles.module.scss'

interface QuestionItemProps{
  question: Question;
  handleUpdateQuestionState: () => void;
}


export function QuestionItem({ question, handleUpdateQuestionState }: QuestionItemProps){
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)

  function handleCloseModal(){ setIsModalVisible(!isModalVisible) }

  return(
    <motion.div layout className={styles.container}>
      <AnimatePresence exitBeforeEnter>
      { isModalVisible && 
        <WarningDeleteModal
          closeModal={handleCloseModal}
          handleRemoveFromList={() => handleUpdateQuestionState()}
          name={question.body}
        /> 
      }
      </AnimatePresence>
      <h2>{question.body}</h2>

      <div className={styles.category_container}>
        <SelectButton title={question.category.name} isActive/>
      </div>

      <button 
        type="button" 
        className={styles.delete_button} 
        onClick={() => setIsModalVisible(!isModalVisible)}
      >
        <Image src={trashSVG} alt="Deletar pergunta"/>
      </button>
    </motion.div>
  )
}