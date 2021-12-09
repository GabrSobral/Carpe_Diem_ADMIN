import { createContext, ReactNode, useCallback, Dispatch, useReducer } from "react";
import axios, { CancelTokenSource } from "axios"

import { uniqueId } from "lodash";
import { api } from "../services/api";
import { FileProps } from "../@types/Activity";

interface ArchiveProps {
  upload: (file: File[]) => void;
  uploadArchives: UploadArchivesProps[];
  allArchives: FileProps[];
  cancelUpload: (id: string, cancelToken: CancelTokenSource) => void;
  allFilesDispatch: Dispatch<actionAllFiles>
  uploadFilesDispatch: Dispatch<actionUploadFiles>
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
   | { type: 'setUploadFiles', payload: { data: UploadArchivesProps[] } }

type stateAllFiles = { allFiles: FileProps[] }
type actionAllFiles =
  | { type: 'setAllFiles', payload: { data: FileProps[] } }
  | { type: 'addFiles', payload: { data: FileProps } }
  | { type: 'deleteFile', payload: { id: string, index: number } }

function reducerUploadFiles(state: stateUploadFiles, action: actionUploadFiles): stateUploadFiles{
  switch(action.type){
    case 'setUploadFiles':
      return { uploadFiles: action.payload.data }

    case 'updateFile': 
      return { 
        uploadFiles: state.uploadFiles.map(
          file => (file.id === action.payload.id ? { ...file, ...action.payload.data } : file)) 
      }

    default: 
      return { uploadFiles: state.uploadFiles }
  }
}

function reducerAllFiles(state: stateAllFiles, action: actionAllFiles): stateAllFiles{
  switch(action.type){
    case 'setAllFiles': 
      return { allFiles: action.payload.data }

    case 'addFiles': 
      return { allFiles: [ action.payload.data, ...state.allFiles] }
    
    case 'deleteFile': 
      state.allFiles.splice(action.payload.index, 1)
      api.delete(`archive/delete/${action.payload.id}`)
      return { allFiles: state.allFiles }

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

    if(uploadedArchive.file)
      data.append('files', uploadedArchive.file, uploadedArchive.name)

    if(uploadedArchive.uploaded)
      return

    api.post('/archive/new', data, {
      cancelToken: uploadedArchive.cancelToken.token,
      onUploadProgress: (event) => {
        let progress: number = Math.round((event.loaded * 100) / event.total)
        uploadFilesDispatch({ type:"updateFile", payload: { data: { progress }, id: uploadedArchive.id }})
      }
    }).then(({data})=>{
      alert(`O upload de ${data.name} foi feito com sucesso`)
      uploadFilesDispatch({ 
        type:"updateFile", 
        payload: { data: {  uploaded: true, id: data.id }, id: uploadedArchive.id }
      })
      allFilesDispatch({ type: 'addFiles', payload: { data } })
    }).catch((data)=>{
      if(data.__proto__.__CANCEL__ === true){
        uploadFilesDispatch({ type:"updateFile", payload: { data: { canceled: true }, id: uploadedArchive.id }})
        return
      }
      uploadFilesDispatch({ type:"updateFile", payload: { data: { error: true }, id: uploadedArchive.id }})
    })
  },[uploadFilesDispatch])

  const upload = useCallback((files: File[]) => {
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

    const concatArrays = uploadedFile.concat(uploadFiles.uploadFiles)
    uploadFilesDispatch({ type: 'setUploadFiles', payload: { data: concatArrays } })
    concatArrays.forEach((item) => processUpload(item))
  },[processUpload, uploadFilesDispatch, uploadFiles.uploadFiles])

  function cancelUpload(id: string, cancelToken: CancelTokenSource){
    cancelToken.cancel()
    uploadFilesDispatch({ type: 'updateFile', payload: { data: { canceled: true }, id } })
  }

  return (
    <ArchiveContext.Provider
      value={{
        upload,
        uploadArchives: uploadFiles.uploadFiles,
        allFilesDispatch,
        allArchives: allFiles.allFiles,
        cancelUpload,
        uploadFilesDispatch
      }}
    >
      {children}
    </ArchiveContext.Provider>
  )
}