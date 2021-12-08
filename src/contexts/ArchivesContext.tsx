import { createContext, ReactNode, useCallback, useState, useReducer } from "react";
import axios, { CancelTokenSource } from "axios"

import { uniqueId } from "lodash";
import { api } from "../services/api";
import { FileProps } from "../@types/Activity";

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

type stateUploadFiles = { uploadFiles: UploadArchivesProps[] }
type actionUploadFiles =
   | { type: 'updateFile', payload: { data: any, id: string } }

type stateAllFiles = { allFiles: FileProps[] }
type actionAllFiles =
  | { type: 'setAllFiles', payload: { data: FileProps[] } }
  | { type: 'deleteFile', payload: { id: string, index: number } }

function reducerUploadFiles(state: stateUploadFiles, action: actionUploadFiles): stateUploadFiles{
  switch(action.type){
    case 'updateFile': 
      return { 
        uploadFiles: state.uploadFiles.map( (file) => (file.id === action.payload.id ? { ...file, ...action.payload.data } : file)) }

    default: 
      return { uploadFiles: state.uploadFiles }
  }
}

function reducerAllFiles(state: stateAllFiles, action: actionAllFiles): stateAllFiles{
  switch(action.type){
    case 'setAllFiles': 
      return { allFiles: action.payload.data }
    
    case 'deleteFile': async () => {
      state.allFiles.splice(action.payload.index, 1)
      await api.delete(`archive/delete/${action.payload.id}`)
      return { allFiles: state.allFiles }
    }

    default: 
      return { allFiles: state.allFiles }
  }
}

export const ArchiveContext = createContext({} as ArchiveProps)

export function ArchiveProvider({ children }: { children: ReactNode; }){
  const [ allFiles, allFilesDispatch ] = useReducer(reducerAllFiles, { allFiles: [] })
  const [ uploadFiles, uploadFilesDispatch ] = useReducer(reducerUploadFiles, { uploadFiles: [] })


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

  const upload = useCallback((files: File[]) => {
//    files.forEach((item, index) => {
//      if (uploadArchives.some(file => file.name == item.name))
//        files.splice(index, 1);
//    })

//   if (files.length === 0 )
//      return

    console.log(files)

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
  },[processUpload, uploadArchives])

  function cancelUpload(id: string, cancelToken: CancelTokenSource){
    cancelToken.cancel()
    updateFile(id, { canceled: true })
  }

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