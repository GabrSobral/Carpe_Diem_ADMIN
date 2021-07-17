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
    api.get('/archive/list').then(({data}) => { handleSetAllArchives(data) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div className={styles.container}>
      {
        isModalVisible && (
          <DetailArchiveModal 
            handleCloseModal={handleCloseModal} 
            file={{file: selectedArchive, index: 0}}/>
        )
      }
      <HeaderContent title="Arquivos"/>
        <main>
          {allArchives.map(( item, index) => (
            <ArchiveListContentItem 
              key={item.id}
              file={item}
              handleDelete={() => deleteArchive(item.id, index)}
              handleSelectArchive={()=> handleSelectArchive(item)}
              handleOpenModal={handleCloseModal}
            />
          ))}
        </main>
    </div>
  )
}