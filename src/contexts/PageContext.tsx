import { createContext, ReactNode, useState } from "react";
import { useActivity } from "../hooks/useActivity";

interface PageProviderProps{
  children: ReactNode;
}

interface PageProps {
  page: string;
  handleSetPage: (name: string) => void;
  handleSetPageClearingState: (name: string) => void
}

export const PageContext = createContext({} as PageProps)

export function PageProvider({ children }: PageProviderProps){
  const [ page, setPage ] = useState<string>('ActivityDetails')
  const { dispatch } = useActivity()

  function handleSetPage(name: string){
    setPage(name)
  }
  function handleSetPageClearingState(name: string){
    setPage(name)
    dispatch({ type: 'clear' })
  }

  return (
    <PageContext.Provider
      value={{
        page,
        handleSetPage,
        handleSetPageClearingState
      }}
    >
      {children}
    </PageContext.Provider>
  )
}