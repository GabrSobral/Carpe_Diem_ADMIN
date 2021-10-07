import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalContainerProps{
  children: ReactNode;
  selector: string;
}

export function ModalContainer({ children, selector }: ModalContainerProps){
  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  },[selector])

  return isMounted ? 
    createPortal(children, document.querySelector(selector) as any)
    : null
}