import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { Question } from "../@types/Activity";
import { api } from "../services/api";

interface AnswersAndCategoriesProviderProps{
  children: ReactNode;
}

interface AnswersAndCategoriesProps {
  questions: Question[];
  handleUpdateQuestionState: (id: string) => void;
  deleteQuestionsAfterDeleteCategory: (category_id: string) => void;
  addQuestion: (question: Question) => void;
}

export const AnswersAndCategoriesContext = createContext({} as AnswersAndCategoriesProps)

export function AnswersAndCategoriesProvider({ children }: AnswersAndCategoriesProviderProps){
  const [ questions, setQuestions ] = useState<Question[]>([])

  useEffect(() => {
		api.get('/question/list').then(({ data }) => { setQuestions(data) })
	},[])

  const handleUpdateQuestionState = useCallback(async (id: string) => {
    await api.delete(`/question/delete/${id}`)
		setQuestions(prev => prev.filter((item) => item.id !== id))
  },[])

  const deleteQuestionsAfterDeleteCategory = useCallback((category_id: string) => {
    setQuestions(prev => prev.filter(item => item.category.id !== category_id))
  },[])

  const addQuestion = useCallback((question: Question) => {
    setQuestions(prevState => [...prevState, question])
  },[])

  return (
    <AnswersAndCategoriesContext.Provider
      value={{
        questions,
        handleUpdateQuestionState,
        deleteQuestionsAfterDeleteCategory,
        addQuestion
      }}
    >
      {children}
    </AnswersAndCategoriesContext.Provider>
  )
}