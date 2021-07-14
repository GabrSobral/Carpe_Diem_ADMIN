import { useContext } from "react";
import { ModalContext } from "../contexts/modal";

export function useModal(){
  return useContext(ModalContext)
}