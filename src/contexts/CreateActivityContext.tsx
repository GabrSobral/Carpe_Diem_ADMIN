import { createContext, ReactNode, useEffect, useState } from "react";

interface CreateActivityProvider{
  children: ReactNode;
}

interface File{
  id: string;
  name: string;
  format: string;
  duration: number;
  category: string;
  url: string;
  author: string;
}
interface Category{
  id: string;
  name: string;
}

interface CreateActivityProps {
  title: string;
  subTitle: string;
  description: string;
  category: Category | undefined;
  archives: File[];
  handleSetCategory: (value: Category) => void;
  handleSetTitle: (value: string) => void;
  handleSetSubTitle: (value: string) => void;
  handleSetDescription: (value: string) => void;
  handleSetArchive: (files: File) => void;
  handleRemoveArchive: (index: number) => void;
  handleClearInputs: () => void;
}

export const CreateActivityContext = createContext({} as CreateActivityProps)

export function CreateActivityProvider({ children }: CreateActivityProvider){
  const [ category, setCategory ] = useState<Category>()
  const [ archives, setArchives ] = useState<File[]>([])
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
  function handleSetArchive(file: File){  
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
    setCategory(undefined)
  }

  return(
    <CreateActivityContext.Provider
      value={{
        category,
        archives,
        handleSetCategory,
        handleSetArchive,
        title,
        subTitle,
        description,
        handleSetTitle,
        handleSetSubTitle,
        handleSetDescription,
        handleRemoveArchive,
        handleClearInputs
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  )
}