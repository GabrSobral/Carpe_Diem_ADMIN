import { createContext, ReactNode, Dispatch, useReducer } from "react";
import { Activity } from "../@types/Activity";

interface ActivityContextProps {
  state: state;
  dispatch: Dispatch<action>
}

type state = {
  activities: Activity[],
  activity?: Activity
}

type action = 
| { type: "setActivities", payload: { data: Activity[] } }
| { type: 'addActivity', payload: { data: Activity } }
| { type: 'removeActivity', payload: { index: number } }
| { type: 'updateActivities', payload: { data: Activity, index: number } }
| { type: 'select', payload: { data: Activity, index: number } }
| { type: 'clear' }

function reducer(state: state, action: action): state{
  switch(action.type){
    case 'setActivities': 
      return { ...state, activities: action.payload.data }

    case 'addActivity' : 
      return { ...state, activities: [...state.activities, action.payload.data] }

    case "removeActivity": 
      state.activities.splice(action.payload.index, 1)
      return { ...state, activities: state.activities}

    case "updateActivities" : 
      state.activities.splice(action.payload.index, 1, action.payload.data)
      return { ...state, activities: state.activities}

    case "select" : 
      action.payload.data.index = action.payload.index;
      return { ...state, activity: action.payload.data }

    case 'clear': 
      return { ...state, activity: undefined}
    
    default: 
      return { ...state, activities: state.activities }
  }
}

export const ActivityContext = createContext({} as ActivityContextProps)

export function ActivityProvider({ children }: { children: ReactNode; }){
  const initialState= {
    activities: [],
    activity: undefined
  }
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}