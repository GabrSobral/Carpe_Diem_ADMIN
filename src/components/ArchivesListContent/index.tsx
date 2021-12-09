import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FileProps } from "../../@types/Activity";
import { useArchive } from "../../hooks/useArchive";
import { api } from "../../services/api";
import { DetailArchiveModal } from "../DetailArchiveModal";
import { HeaderContent } from "../HeaderContent";
import { ArchiveListContentItem } from "./ArchiveListContentItem";
import styles from "./styles.module.scss" 

export function ArchivesListContent(){
  const { allArchives, allFilesDispatch } = useArchive()
  const [ selectedArchive, setSelectedArchive ] = useState<FileProps>({} as FileProps)
  const [ isModalVisible, setIsModalVisible] = useState<boolean>(false)

  useEffect(() => {
      api.get('/archive/list?cmd=count')
        .then(({ data }) => allFilesDispatch({ type: 'setAllFiles', payload: { data } }))
  },[allFilesDispatch])

  return(
    <div className={styles.container_archiveListContent}>

      <DetailArchiveModal 
        isVisible={isModalVisible}
        handleCloseModal={() => setIsModalVisible(false)} 
        file={{file: selectedArchive, index: 0}}
      />
    
      <HeaderContent title="Arquivos"/>
        <main className={styles.main_archiveListContent}>
          {allArchives.map(( item, index) => (
            <ArchiveListContentItem
              key={item.id}
              file={item}
              handleDelete={() => allFilesDispatch({ type: 'deleteFile', payload: { id: item.id, index } })}
              handleSelectArchive={()=> setSelectedArchive(item)}
              handleOpenModal={() => setIsModalVisible(prev => !prev)}
            />
          ))}
        </main>
    </div>
  )
}