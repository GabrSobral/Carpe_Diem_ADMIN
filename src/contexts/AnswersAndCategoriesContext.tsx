import { createContext, ReactNode, useEffect, useReducer, Dispatch } from "react";
import { Question } from "../@types/Activity";
import { api } from "../services/api";

interface AnswersAndCategoriesProps {
  questions: Question[];
  questionDispatch: Dispatch<action>;
}

type state = { questions: Question[] }
type action =
  | { type: 'setQuestions', payload: { data: Question[] }}
  | { type: 'deleteQuestion', payload: { id: string }}
  | { type: 'addQuestion', payload: { data: Question }}
  | { type: 'deleteQuestionsAfterCategory', payload: { category_id: string }}

function reducer(state: state, action: action){
  switch(action.type){
    case 'setQuestions':
      return { questions: action.payload.data }

    case 'deleteQuestion':
      (async () => await api.delete(`/question/delete/${action.payload.id}`))()
      return { questions:  state.questions.filter((item) => item.id !== action.payload.id) }

    case 'addQuestion':
      return { questions: [ ...state.questions, action.payload.data ] }

    case "deleteQuestionsAfterCategory": 
      return { questions: state.questions.filter(item => item.category.id !== action.payload.category_id) }
  }
}

export const AnswersAndCategoriesContext = createContext({} as AnswersAndCategoriesProps)

export function AnswersAndCategoriesProvider({ children }: { children: ReactNode; }){
  const [ questions, questionDispatch ] = useReducer(reducer, { questions: [] })

  useEffect(() => {
		api.get('/question/list').then(
      ({ data }) => questionDispatch({ type: 'setQuestions', payload: { data } }))
	},[])

  return (
    <AnswersAndCategoriesContext.Provider
      value={{
        questions: questions.questions,
        questionDispatch
      }}
    >
      {children}
    </AnswersAndCategoriesContext.Provider>
  )
}