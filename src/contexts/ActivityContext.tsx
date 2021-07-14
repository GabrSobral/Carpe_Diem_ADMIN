import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface ActivityProviderProps{
  children: ReactNode;
}

interface FileProps {
  id: string;
  name: string;
  format: string;
  duration: number;
  category: string;
  url: string 
}

interface Activity{
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  body: string;
  category: string;
  files: FileProps[]
}

interface ActivityContextProps {
  activities: Activity[] | undefined;
  activity: Activity | undefined;
  handleSelectActivity: (activity_data: Activity) => void;
  handleSetActivities: (activitiesData: Activity[]) => void;
  handleClearSelectActivity: () => void
  handleAddActivity: (activity_data: Activity) => void
}

export const ActivityContext = createContext({} as ActivityContextProps)

export function ActivityProvider({ children }: ActivityProviderProps){
  const [ activities, setActivities ] = useState<Activity[]>([])
  const [ activity, setActivity ] = useState<Activity>()


  function handleSetActivities(activitiesData: Activity[]){
    setActivities(activitiesData)
  }
  function handleSelectActivity(activity_data: Activity){
    setActivity(activity_data)
  }
  function handleClearSelectActivity(){ setActivity(undefined) }

  function handleAddActivity(activity_data: Activity){
    setActivities(prevState => [...prevState, activity_data])
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        handleSelectActivity,
        activity,
        handleSetActivities,
        handleClearSelectActivity,
        handleAddActivity
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}