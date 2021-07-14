import { createContext, ReactNode, useEffect, useState } from "react";
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
  const { handleClearSelectActivity } = useActivity()

  function handleSetPage(name: string){
    setPage(name)
  }
  function handleSetPageClearingState(name: string){
    setPage(name)
    handleClearSelectActivity()
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