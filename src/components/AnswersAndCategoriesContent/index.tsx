import { useEffect, useState } from "react";
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'

import { Question } from "../../@types/Activity";
import { api } from "../../services/api";
import plusSVG from '../../images/plus.svg'

import { HeaderContent } from "../HeaderContent";
import { QuestionItem } from "../QuestionItem";

import styles from "./styles.module.scss" 
import { CreateQuestionInput } from "../CreateQuestionInput";

export function AnswersAndCategoriesContent(){
  const [ questions, setQuestions ] = useState<Question[]>([])
  const [ createQuestionIsVisible, setCreateQuestionIsVisible ] = useState(false)

  useEffect(() => {
    (async function(){
      await api.get('/question/list').then(({data}) => { setQuestions(data) })
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleUpdateQuestionState(id: string){
    const newList = questions.filter((item) => item.id !== id);

    setQuestions(newList)
  }

  function handleAddQuestionToList(question: Question){
    setQuestions(prevState => [...prevState, question])
  }

  return(
    <div className={styles.container}>
      <HeaderContent title="Categorias e perguntas"/>
        <button type='button' onClick={() => setCreateQuestionIsVisible(!createQuestionIsVisible)}>
          Criar Pergunta
          <Image src={plusSVG} alt="Icone de adicionar"/>
        </button>

        <AnimatePresence>
          { createQuestionIsVisible && (
            <CreateQuestionInput handleAddQuestionToList={handleAddQuestionToList}/>
          )}
        </AnimatePresence>

        <main className={styles.main_content}>
          {questions.map((item) => (
            <QuestionItem 
              key={item.id}
              question={item}
              handleUpdateQuestionState={() => handleUpdateQuestionState(item.id)}
            />
          ))}
        </main>
    </div>
  )
}