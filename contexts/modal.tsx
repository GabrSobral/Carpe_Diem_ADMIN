import { createContext, ReactNode, useState } from "react";

export const ModalContext = createContext({} as ModalProps)

interface ModalProviderProps{
  children: ReactNode;
}

interface ModalProps {
  handleModalCategory: () => void;
  handleModalArchives: () => void;
  isOpenCategory: boolean;
  isOpenArchives: boolean;
}

export function ModalProvider({children}: ModalProviderProps){
  const [ isOpenCategory, setIsOpenCategory ] = useState<boolean>(false)
  const [ isOpenArchives, setIsOpenArchives ] = useState<boolean>(false)

  function handleModalCategory(){ setIsOpenCategory(!isOpenCategory) }
  function handleModalArchives(){ setIsOpenArchives(!isOpenArchives) }

  return(
    <ModalContext.Provider
      value={{
        isOpenCategory,
        isOpenArchives,
        handleModalCategory,
        handleModalArchives
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}