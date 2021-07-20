import { useEffect, useState } from "react";
import { Question } from "../../@types/Activity";
import { api } from "../../services/api";
import { HeaderContent } from "../HeaderContent";
import { QuestionItem } from "../QuestionItem";
import styles from "./styles.module.scss" 

export function AnswersAndCategoriesContent(){
  const [ questions, setQuestions ] = useState<Question[]>([])


  useEffect(() => {
    (async function(){
      await api.get('/question/list').then(({data}) => { setQuestions(data) })
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div className={styles.container}>
      <HeaderContent title="Categorias e perguntas"/>
        <main>
          {questions.map(item => (
            <QuestionItem key={item.id}/>
          ))}
        </main>
    </div>
  )
}