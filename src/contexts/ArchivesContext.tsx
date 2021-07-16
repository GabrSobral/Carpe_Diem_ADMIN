import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { uniqueId } from "lodash";
import { api } from "../services/api";

interface ArchiveProviderProps{
  children: ReactNode;
}

interface ArchiveProps {
  upload: (file: File[]) => void;
  uploadArchives: UploadArchivesProps[]
}
export interface UploadArchivesProps{
  file: File | null;
  id: string;
  name: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  canceled: boolean;
  url: string |  null;
}

export const ArchiveContext = createContext({} as ArchiveProps)

export function ArchiveProvider({ children }: ArchiveProviderProps){
  const [ uploadArchives, setUploadArchives ] = useStateWithCallbackLazy<UploadArchivesProps[]>([])
  const [ aux, setAux ] = useState(false)

  const upload = async (files: File[]) => {
    const uploadedFile = files.map((file )=> ({
      file,
      id: uniqueId(),
      name: file.name,
      progress: 0,
      uploaded: false,
      error: false,
      canceled: false,
      url: null
    } as UploadArchivesProps))

    const concatArrays = uploadedFile.concat(uploadArchives)
    
    setUploadArchives(concatArrays, (currentUpload: UploadArchivesProps[]) => {
      currentUpload.forEach((item) => processUpload(item)) 
    })
  }

  function updateFile(id: string, data: any){
    setUploadArchives(prevState => prevState.map(item => {
      return id === item.id ? {...item, ...data} : item}), () => {})
  }

  function processUpload(uploadedArchive: UploadArchivesProps){
    const data = new FormData()
    if(uploadedArchive.file){
      data.append('files', uploadedArchive.file, uploadedArchive.name)
    }

    api.post('/archive/new', data, {
      onUploadProgress: (event) => {
        let progress: number = Math.round((event.loaded * 100) / event.total)
        console.log(progress)
        updateFile(uploadedArchive.id, { progress })
      }
    }).then(({data})=>{
      alert()
      updateFile(uploadedArchive.id, { uploaded: true, id: data.id })
    }).catch(()=>{
      updateFile(uploadedArchive.id, { error: true })
    })

  }

  return (
    <ArchiveContext.Provider
      value={{
        upload,
        uploadArchives
      }}
    >
      {children}
    </ArchiveContext.Provider>
  )
}