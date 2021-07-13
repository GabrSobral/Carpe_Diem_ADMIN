import { createContext, ReactNode } from "react";

interface ActivityProviderProps{
  children: ReactNode;
}
interface ActivityContextProps {

}

export const ActivityContext = createContext({} as ActivityContextProps)

export function ActivityProvider({ children }: ActivityProviderProps){
  <ActivityContext.Provider
    value={{

    }}
  >
    {children}
  </ActivityContext.Provider>
}