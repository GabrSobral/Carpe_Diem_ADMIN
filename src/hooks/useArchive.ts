import { useContext } from "react";
import { ArchiveContext } from "../contexts/ArchivesContext";

export function useArchive(){
  return useContext(ArchiveContext)
}