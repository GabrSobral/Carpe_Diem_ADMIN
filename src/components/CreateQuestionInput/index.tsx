import { useState } from 'react'
import Image from 'next/image'

import saveSVG from '../../images/save.svg'
import { Category, Question } from '../../@types/Activity'

import { InputCreate } from '../InputCreate'
import { SelectButton } from '../SelectButton'
import styles from './styles.module.scss'
import Loading from 'react-loading'
import { Modal } from './Modal'
import { api } from '../../services/api'

interface CreateQuestionInputProps{
  handleAddQuestionToList: (question: Question) => void
}

export function CreateQuestionInput({ handleAddQuestionToList }: CreateQuestionInputProps){
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ question, setQuestion ] = useState<string>("")
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const [ category , setCategory ] = useState<Category>()

  function handleSetQuestion(value: string){ setQuestion(value) }
  function handleSelectCategory(value: Category){ setCategory(value) }

  async function createQuestion(){
    setIsLoading(true)
    const { data } = await api.post('/question/new', { body: question, category: category?.id })
    
    const questionFormatted: Question = {
      id: data.id,
      body: data.body,
      category : {
        id: category?.id || '',
        name: category?.name || ''
      }
    }

    handleAddQuestionToList(questionFormatted)
    setIsLoading(false)
    setQuestion('')
    setCategory(undefined)
  }

  return(
    <div className={styles.container}>
      { isModalVisible && 
        <Modal  
          handleModalClose={() => setIsModalVisible(false)}
          handleSelectData={handleSelectCategory}
        /> }
      <InputCreate 
        title="Pergunta" 
        value={question} 
        setValue={handleSetQuestion} 
        type="text"
      />
      
      <div className={`${styles.select_container} ${ category?.id && styles.active}`}>
        <span>Categoria:</span>
        <SelectButton 
          isActive={category ? true : false} 
          title={category?.name || 'Selecione'} 
          onClick={() => setIsModalVisible(!isModalVisible)}
        />
      </div>

      <div className={styles.absolute}>
        <button 
        onClick={createQuestion}
          type="submit" 
          className={styles.submit_button}
          disabled={isLoading || !question}
        >
          {
            isLoading ? <Loading type="spin" width={32} height={32} color="#fff"/>
            : (<>
                <Image src={saveSVG} alt="Icone de salvar"/>
                Salvar
              </>)
          }
        </button>
      </div>
    </div>
  )
}