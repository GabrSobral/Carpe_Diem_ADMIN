import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

export function usePage(){
  return useContext(PageContext)
}