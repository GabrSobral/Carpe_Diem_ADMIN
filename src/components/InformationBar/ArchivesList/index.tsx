import { ArchiveItemList } from "../../ArchiveItemList";
import DropZone from 'react-dropzone'
import Image from 'next/image'
import AddFileSVG from '../../../images/new_archive.svg'

import { useArchive } from "../../../hooks/useArchive";
import styles from './styles.module.scss'

export  function ArchivesList(){
  const { upload, uploadArchives } = useArchive()

  return(
    <>
      <DropZone accept={['image/*', "video/*", 'audio/*']} onDropAccepted={(file) => upload(file)}>
         { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
           <div 
            {...getRootProps()}
            
            className={`${styles.drop_container} ${isDragActive && styles.drag_active} ${isDragReject && styles.drag_reject}`}
            >
              <Image src={AddFileSVG} alt="Novos arquivos"/>
              <span>Arraste novos <br/> arquivos para cá</span>
              <input {...getInputProps()}/>
           </div>
         )}
      </DropZone>
      { uploadArchives?.length !== 0 && 
        uploadArchives?.map(file => ( <ArchiveItemList key={file.id} file={file}/> ))
      }
    </>
  )
}