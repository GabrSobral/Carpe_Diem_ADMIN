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
  cancelUpload: (id: string, cancelToken: CancelTokenSource) => void;
  deleteArchive: (id: string, index: number) => void
}
export interface UploadArchivesProps{
  file: File | null;
  id: string;
  name: string;
  size: number,
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  canceled: boolean;
  url: string |  null;
  cancelToken: CancelTokenSource;
}

export const ArchiveContext = createContext({} as ArchiveProps)

export function ArchiveProvider({ children }: ArchiveProviderProps){
  const [ allArchives, setAllArchives ] = useState<FileProps[]>([])
  const [ uploadArchives, setUploadArchives ] = useState<UploadArchivesProps[]>([])

  function handleSetAllArchives(archives: FileProps[]){
    setAllArchives(archives)
  }

  useEffect(() => {
    console.log(allArchives)
  },[allArchives])

  async function deleteArchive(id: string, index: number){
    const allFiles = allArchives
    allFiles.splice(index, 1)
    console.log('id: ', id, 'index: ', index)
    await api.delete(`archive/delete/${id}`)

    const newList = allArchives.filter((item) => item.id !== id);

    setAllArchives(newList)
  }

  const upload = async (files: File[]) => {
    const uploadedFile = files.map((file )=> ({
      file,
      id: uniqueId(),
      name: file.name,
      size: file.size,
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
      setAllArchives(prevState => [data, ...prevState])
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
        cancelUpload,
        deleteArchive
      }}
    >
      {children}
    </ArchiveContext.Provider>
  )
}