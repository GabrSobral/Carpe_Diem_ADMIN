import Image from 'next/image'

import trashSVG from '../../images/trash.svg'
import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'
import deleteSVG from '../../images/delete.svg'

import { Question } from '../../@types/Activity'
import { SelectButton } from '../SelectButton'
import styles from './styles.module.scss'
import Loading from 'react-loading'
import { useState } from 'react'
import { api } from '../../services/api'

interface QuestionItemProps{
  question: Question;
  handleUpdateQuestionState: () => void;
}


export function QuestionItem({ question, handleUpdateQuestionState }: QuestionItemProps){
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)

  function DeleteQuestionModal(){
    const [ isLoading, setIsLoading ] = useState(false)

    function handleDelete(){
      setIsLoading(true)
      api.delete(`/question/delete/${question.id}`).then(() => {
        handleUpdateQuestionState()
      })
    }
  
    return(
      <div className={styles.Modalbackground}>
        <div className={styles.modal_popup}>
          <Image 
            src={deleteSVG} 
            alt="Imagem de lixeira"
            height={256}
          />
          <h2>
            Você tem certeza de que quer excluir: <span>{question.body}</span>?
          </h2>
  
          <span>Ao excluir esta pergunta, você estará excluindo todas
            as suas relações, como: respostas do usuário...
            <strong>Você quer prosseguir?</strong>
          </span>
          <div className={styles.button_container_modal}>
            <button 
              type="button" 
              onClick={handleDelete}
            >
              {
                isLoading ? <Loading type="spin" color="#fff" height={24} width={24}/>
                : (<>
                    <Image 
                      src={checkSVG} 
                      alt="Imagem de confirmação"
                    />
                    Sim
                  </>)
              }
            </button>
            <button type="button" onClick={() => setIsModalVisible(!isModalVisible)}>
              <Image 
                src={xSVG} 
                alt="Imagem de deleção"
              />
              Não
            </button>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className={styles.container}>
      {isModalVisible && <DeleteQuestionModal/>}
      <h2>{question.body}</h2>

      <div className={styles.category_container}>
        <SelectButton title={question.category.name} isActive/>
      </div>

      <button 
        type="button" 
        className={styles.delete_button} 
        onClick={() => setIsModalVisible(true)}
      >
        <Image src={trashSVG} alt="Deletar pergunta"/>
      </button>
    </div>
  )
}