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

  function handleSelectArchive(archive: FileProps){
    setSelectedArchive(archive)
  }
  function handleCloseModal(){
    setIsModalVisible(!isModalVisible)
  }

  useEffect(() => {
    (async function(){
      await api.get('/archive/list').then(({data}) => { handleSetAllArchives(data) })
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div className={styles.container}>
      <AnimatePresence exitBeforeEnter>
      {
        isModalVisible && (
          <DetailArchiveModal 
            handleCloseModal={handleCloseModal} 
            file={{file: selectedArchive, index: 0}}/>
        )
      }
      </AnimatePresence>

      <HeaderContent title="Arquivos"/>
        <main>
          {allArchives.map(( item, index) => (
            <AnimatePresence exitBeforeEnter key={item.id}>
            <ArchiveListContentItem 
              
              file={item}
              handleDelete={() => deleteArchive(item.id, index)}
              handleSelectArchive={()=> handleSelectArchive(item)}
              handleOpenModal={handleCloseModal}
            />
            </AnimatePresence>
          ))}
        </main>
    </div>
  )
}