import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import Image from 'next/image'

import { SelectModal } from '../SelectModal'
import { InputCreate } from '../InputCreate'
import { SelectButton } from '../SelectButton'

import { Category, Question } from '../../@types/Activity'
import { api } from '../../services/api'
import saveSVG from '../../images/save.svg'

import styles from './styles.module.scss'

interface CreateQuestionInputProps{
  handleAddQuestionToList: (question: Question) => void
}

export function CreateQuestionInput({ handleAddQuestionToList }: CreateQuestionInputProps){
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ isFilled, setIsFilled ] = useState(false)
  const [ question, setQuestion ] = useState<string>("")
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ category , setCategory ] = useState<Category>()

  useEffect(() => {
    question && category ? setIsFilled(true) : setIsFilled(false)
  },[category, question])

  function handleSetQuestion(value: string){ setQuestion(value) }

  function handleCloseCategoryModal(){ setIsModalVisible(!isModalVisible) }
  function handleSetCategory(data: Category){ setCategory(data) }

  async function handleFetchCategories(){
    const { data } = await api.get('/category/list')
    return data
  }

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
        <SelectModal 
          handleSelectData={handleSetCategory}
          title="Selecione a categoria"
          handleModalClose={handleCloseCategoryModal}
          fetchFunction={handleFetchCategories}
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
          disabled={isLoading || !isFilled}
        >
          {isLoading ? <Loading type="spin" width={32} height={32} color="#fff"/>
            : (<>
                <Image src={saveSVG} alt="Icone de salvar"/>
                Salvar
              </>)}
        </button>
      </div>
    </div>
  )
}