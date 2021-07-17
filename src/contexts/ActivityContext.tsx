import { createContext, ReactNode, useEffect, useState } from "react";
import { Activity } from "../@types/Activity";
import { api } from "../services/api";

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
    activity?.index && activities.splice(activity?.index, 1)
    setActivities(activities)
  }
  function handleUpdateActivityFromList(update_activity: Activity){
    activity?.index && activities.splice(activity?.index, 1, update_activity)
    setActivities(activities)
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