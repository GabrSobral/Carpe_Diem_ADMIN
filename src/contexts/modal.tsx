import { createContext, ReactNode, useState } from "react";

export const ModalContext = createContext({} as ModalProps)

interface ModalProviderProps{
  children: ReactNode;
}

interface Categories {
  id: string;
  name: string;
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

interface ModalProps {
  handleModalCategory: () => void;
  handleModalArchives: () => void;
  isOpenCategory: boolean;
  isOpenArchives: boolean;
  categories: Categories[];
  archives: File[];
  handleSetCategories: (data: Categories[]) => void;
  handlesetArchives: (data: File[]) => void;
}

export function ModalProvider({children}: ModalProviderProps){
  const [ isOpenCategory, setIsOpenCategory ] = useState<boolean>(false)
  const [ isOpenArchives, setIsOpenArchives ] = useState<boolean>(false)

  const [ categories, setCategories ] = useState<Categories[]>([])
  const [ archives, setArchives ] = useState<File[]>([])

  function handleModalCategory(){ setIsOpenCategory(!isOpenCategory) }
  function handleModalArchives(){ setIsOpenArchives(!isOpenArchives) }
  function handleSetCategories(data: Categories[]){ setCategories(data) }
  function handlesetArchives(data: File[]){ setArchives(data) }

  return(
    <ModalContext.Provider
      value={{
        isOpenCategory,
        isOpenArchives,
        handleModalCategory,
        handleModalArchives,
        categories,
        archives,
        handleSetCategories,
        handlesetArchives
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}