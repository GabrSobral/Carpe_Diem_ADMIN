import { createContext, ReactNode, Dispatch, useReducer } from "react";
import { Category, FileProps, Activity } from "../@types/Activity";

interface CreateActivityProps {
 newActivity: state;
 createActivityDispatch: Dispatch<action>
}

type state = {
  title: string;
  subtitle: string;
  description: string;
  category?: Category;
  files: FileProps[];
}

type action = 
  | { type: "setTitle", payload: { data: string } }
  | { type: "setSubTitle", payload: { data: string } }
  | { type: "setDescription", payload: { data: string } }
  | { type: "setCategory", payload: { data: Category } }
  | { type: "setArchives", payload: { data: FileProps } }
  | { type: "removeArchive", payload: { index: number } }
  | { type: "clearInputs" }
  | { type: "setActivity", payload: { data: Activity } }


function reducer(state: state, action: action): state{
  switch(action.type){
    case 'setTitle': 
      return { ...state, title: action.payload.data }

    case 'setSubTitle': 
    return { ...state, subtitle: action.payload.data }

    case 'setDescription': 
    return { ...state, description: action.payload.data }
    
    case 'setCategory': 
    return { ...state, category: action.payload.data }

    case 'setArchives': 
      return { ...state, files: [...state.files, action.payload.data] }

    case 'removeArchive': 
      state?.files.splice(action.payload.index, 1)
      return state

    case 'clearInputs': 
      return { 
        title: '', 
        subtitle: '', 
        description: '', 
        files: [], 
        category: undefined 
      }
    
    case 'setActivity':
      return { 
        title: action.payload.data.title,
        subtitle: action.payload.data.description,
        description: action.payload.data.body,
        files: action.payload.data.files,
        category: action.payload.data.category
      }
    default: 
      return state;
  }
}

export const CreateActivityContext = createContext({} as CreateActivityProps)

export function CreateActivityProvider({ children }: {  children: ReactNode; }){
  const initialState = {
    title: '',
    subtitle: '',
    description: '',
    files: [],
    category: undefined
  }
  const [ newActivity, dispatch ] = useReducer(reducer, initialState)

  return(
    <CreateActivityContext.Provider
      value={{
        newActivity,
        createActivityDispatch: dispatch
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  )
}