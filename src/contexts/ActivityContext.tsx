import { createContext, ReactNode, useState } from "react";
import { Activity } from "../@types/Activity";

interface ActivityProviderProps{
  children: ReactNode;
}

interface ActivityContextProps {
  activities: Activity[] | undefined;
  activity: Activity | undefined;
  handleSelectActivity: (activity_data: Activity, index: number) => void;
  handleSetActivities: (activitiesData: Activity[]) => void;
  handleClearSelectActivity: () => void
  handleAddActivity: (activity_data: Activity) => void;
  handleRemoveActivityFromList: () => void;
  handleUpdateActivityFromList: (activity_data: Activity) => void;
}

export const ActivityContext = createContext({} as ActivityContextProps)

export function ActivityProvider({ children }: ActivityProviderProps){
  const [ activities, setActivities ] = useState<Activity[]>([])
  const [ activity, setActivity ] = useState<Activity>()

  function handleSetActivities(activitiesData: Activity[]){
    setActivities(activitiesData)
  }
  function handleSelectActivity(activity_data: Activity, index: number){
    activity_data.index = index
    setActivity(activity_data)
  }
  function handleClearSelectActivity(){ setActivity(undefined) }

  function handleAddActivity(activity_data: Activity){
    setActivities(prevState => [...prevState, activity_data])
  }
  function handleRemoveActivityFromList(){
    setActivities(prev => {
      activity?.index && prev.splice(activity?.index, 1)
      return prev
    })
  }
  function handleUpdateActivityFromList(update_activity: Activity){
    setActivities(prev => {
      activity?.index && prev.splice(activity?.index, 1, update_activity)
      return prev
    })
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        handleSelectActivity,
        activity,
        handleSetActivities,
        handleClearSelectActivity,
        handleAddActivity,
        handleRemoveActivityFromList,
        handleUpdateActivityFromList
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}