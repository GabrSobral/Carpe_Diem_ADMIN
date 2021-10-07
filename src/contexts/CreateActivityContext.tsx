import { createContext, ReactNode, useState } from "react";
import { Category, FileProps } from "../@types/Activity";
import { useArchive } from "../hooks/useArchive";

interface CreateActivityProvider{
  children: ReactNode;
}

interface CreateActivityProps {
  title: string;
  subTitle: string;
  description: string;
  category: Category | undefined;
  archives: FileProps[] | [];
  handleSetCategory: (value: Category) => void;
  handleSetTitle: (value: string) => void;
  handleSetSubTitle: (value: string) => void;
  handleSetDescription: (value: string) => void;
  handleSetArchive: (files: FileProps) => void;
  handleRemoveArchive: (index: number) => void;
  handleClearInputs: () => void;
}

export const CreateActivityContext = createContext({} as CreateActivityProps)

export function CreateActivityProvider({ children }: CreateActivityProvider){
  const [ category, setCategory ] = useState<Category | undefined>()
  const [ archives, setArchives ] = useState<FileProps[]>([])
  const [ title, setTitle ] = useState<string>('')
  const [ subTitle, setSubTitle ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')

  function handleSetTitle(value: string){ 
    setTitle(value) 
  }
  function handleSetSubTitle(value: string){ 
    setSubTitle(value) 
  }
  function handleSetDescription(value: string){ 
    setDescription(value) 
  }
  function handleSetCategory(value: Category){ 
    setCategory(value) 
  }
  function handleSetArchive(file: FileProps){  
    setArchives(prevState => [ ...prevState, file ]) 
  }
  function handleRemoveArchive(index: number){
    archives?.splice(index, 1)
    setArchives(archives)
  }
  function handleClearInputs(){
    setTitle('')
    setSubTitle('')
    setDescription('')
    setCategory(undefined)
    setArchives([])
  }

  return(
    <CreateActivityContext.Provider
      value={{
        category,
        archives,
        handleSetArchive,
        handleClearInputs,
        handleSetCategory,
        title,
        subTitle,
        description,
        handleSetTitle,
        handleSetSubTitle,
        handleRemoveArchive,
        handleSetDescription,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  )
}