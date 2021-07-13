import { useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";

export function useActivity(){
  return useContext(ActivityContext)
}