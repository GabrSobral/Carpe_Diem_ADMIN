import { useContext } from "react";
import { CreateActivityContext } from "../contexts/CreateActivityContext";

export function useCreateActivity(){
  return useContext(CreateActivityContext)
}