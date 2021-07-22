import { createContext, ReactNode, useContext, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { WarningDeleteModal } from "../components/WarningDeleteModal";

interface ModalContextProps{
  openWarningModal: () => void
  WarningModal: (name: string, handleUpdateDataState: Function) => any
}
interface ModalProviderProps{
  children: ReactNode;
}
interface WarningModalProps{
  name: string;
  handleUpdateDataState: Function
}

export const ModalContext = createContext({} as ModalContextProps)

export function ModalProvider({ children }: ModalProviderProps){
  const [ WarningModalIsVisible, setWarningModalIsVisible ] = useState(false)

  function openWarningModal(){ setWarningModalIsVisible(!WarningModalIsVisible) }
  
  function WarningModal({name, handleUpdateDataState}: any){
    return(
      <AnimatePresence exitBeforeEnter>
      { WarningModalIsVisible && 
        <motion.div
          layout
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0, scale: 0}}
          transition={{ duration: 0.2 }}
        >
          <WarningDeleteModal
            closeModal={openWarningModal}
            handleRemoveFromList={() => handleUpdateDataState()}
            name={name}
          /> 
        </motion.div>
      }
      </AnimatePresence>
    )
  }

  return(
    <ModalContext.Provider
      value={{
        openWarningModal,
        WarningModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
} 

export function useModal(){
  return useContext(ModalContext)
}