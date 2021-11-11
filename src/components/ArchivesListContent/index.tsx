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
  const { handleSetAllArchives, allArchives, deleteArchive } = useArchive()
  const [ selectedArchive, setSelectedArchive ] = useState<FileProps>({} as FileProps)
  const [ isModalVisible, setIsModalVisible] = useState<boolean>(false)

  useEffect(() => {
    (async function(){
      api.get('/archive/list')
        .then(({ data }) => handleSetAllArchives(data)
      )
    })()
  },[handleSetAllArchives])

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
              handleDelete={() => deleteArchive(item.id, index)}
              handleSelectArchive={()=> setSelectedArchive(item)}
              handleOpenModal={() => setIsModalVisible(prev => !prev)}
            />
          ))}
        </main>
    </div>
  )
}