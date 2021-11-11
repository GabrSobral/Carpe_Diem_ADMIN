import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  handleAddQuestionToList: (question: Question) => void;
  isVisible: boolean;
}

export function CreateQuestionInput({ handleAddQuestionToList, isVisible }: CreateQuestionInputProps){
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ question, setQuestion ] = useState<string>("")
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ category , setCategory ] = useState<Category>()

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
    <AnimatePresence exitBeforeEnter>
      {isVisible &&
        <motion.div 
          className={styles.container_CreateQuestionInput}
          initial={{ height: 0, marginTop: 0}}
          animate={{ height: 'fit-content', marginTop: '1rem'}}
          exit={{ height: 0, marginTop: 0}}  
        >
          <SelectModal 
            isVisible={isModalVisible}
            handleSelectData={(data: Category) => setCategory(data)}
            title="Selecione a categoria"
            handleModalClose={() => setIsModalVisible(false)}
            fetchFunction={handleFetchCategories}
            alreadyExists={[category]}
          />
          
          <div className={styles.main_container}>
          <InputCreate 
            title="Pergunta" 
            value={question} 
            setValue={(value: string) => setQuestion(value)} 
            type="text"
          />
          
          <div className={`${styles.select_container} ${ category?.id && styles.active}`}>
            <span>Categoria:</span>
            <SelectButton 
              icon={category?.name || ''}
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
              disabled={isLoading || (!question && !category)}
            >
              {isLoading ? <Loading type="spin" width={32} height={32} color="#fff"/>
                : 
                <>
                  <Image src={saveSVG} alt="Icone de salvar"/>
                  Salvar
                </>}
            </button>
          </div>
        </div>
      </motion.div>
      }
    </AnimatePresence>
  )
}