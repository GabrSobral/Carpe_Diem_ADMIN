import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios"

import { uniqueId } from "lodash";
import { api } from "../services/api";
import { FileProps } from "../@types/Activity";

interface ArchiveProviderProps{
  children: ReactNode;
}

interface ArchiveProps {
  upload: (file: File[]) => void;
  uploadArchives: UploadArchivesProps[];
  handleSetAllArchives: (archives: FileProps[]) => void
  allArchives: FileProps[];
  cancelUpload: (id: string, cancelToken: CancelTokenSource) => void
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
  cancelToken: CancelTokenSource;
}

export const ArchiveContext = createContext({} as ArchiveProps)

export function ArchiveProvider({ children }: ArchiveProviderProps){
  const [ uploadArchives, setUploadArchives ] = useState<UploadArchivesProps[]>([])
  const [ allArchives, setAllArchives ] = useState<FileProps[]>([])

  function handleSetAllArchives(archives: FileProps[]){
    setAllArchives(archives)
  }

  const upload = async (files: File[]) => {
    const uploadedFile = files.map((file )=> ({
      file,
      id: uniqueId(),
      name: file.name,
      progress: 0,
      uploaded: false,
      error: false,
      canceled: false,
      url: null,
      cancelToken: axios.CancelToken.source()
    } as UploadArchivesProps))

    const concatArrays = uploadedFile.concat(uploadArchives)
    setUploadArchives(concatArrays)
    concatArrays.forEach((item) => processUpload(item))
  }

  const updateFile = useCallback((id: string, data: any) => {
    setUploadArchives((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  function cancelUpload(id: string, cancelToken: CancelTokenSource){
    cancelToken.cancel()
    updateFile(id, { canceled: true })
  }

  const processUpload = useCallback((uploadedArchive: UploadArchivesProps) => {
    const data = new FormData()

    if(uploadedArchive.file){
      data.append('files', uploadedArchive.file, uploadedArchive.name)
    }
    if(uploadedArchive.uploaded){
      return
    }

    api.post('/archive/new', data, {
      cancelToken: uploadedArchive.cancelToken.token,
      onUploadProgress: (event) => {
        let progress: number = Math.round((event.loaded * 100) / event.total)
        console.log(progress)
        updateFile(uploadedArchive.id, { progress })
      }
    }).then(({data})=>{
      alert(`O upload de ${data.name} foi feito com sucesso`)
      updateFile(uploadedArchive.id, { uploaded: true, id: data.id })
    }).catch((data)=>{
      if(data.__proto__.__CANCEL__ === true){
        updateFile(uploadedArchive.id, { canceled: true })
        return
      }
      updateFile(uploadedArchive.id, { error: true })
    })
  },[updateFile])

  return (
    <ArchiveContext.Provider
      value={{
        upload,
        uploadArchives,
        handleSetAllArchives,
        allArchives,
        cancelUpload
      }}
    >
      {children}
    </ArchiveContext.Provider>
  )
}