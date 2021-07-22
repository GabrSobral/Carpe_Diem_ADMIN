import { useState } from 'react'
import { format } from 'date-fns'
import fileSize from 'filesize'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Loading from 'react-loading'

import { FileProps } from '../../../@types/Activity'

import details_vertical from '../../../images/details_vertical.svg'
import trashSVG from '../../../images/trash.svg'
import viewSVG from '../../../images/view.svg'

import styles from './styles.module.scss'

interface ArchiveListContentItemProps{
  file: FileProps;
  handleDelete: () => void;
  handleSelectArchive: (file: FileProps) => void;
  handleOpenModal: () => void
}

export function ArchiveListContentItem({ file, handleDelete, handleSelectArchive, handleOpenModal }: ArchiveListContentItemProps){
  const [ isLoading, setIsLoading ] = useState(false)
  const date = Date.parse(String(file.created_at)) || new Date()
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH:mm")
  
  return(
    <motion.div 
      layout 
      className={styles.container}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}  
      exit={{ scale: 0 }}
    >
      <header>
        <div></div>
        <span>Formato: {file.format}</span>
      </header>

      <main className={styles.item_content}>
        <div>
          <span>{file.name}</span>
          <div>
            <p>Tamanho: {fileSize(file.size || 0)}</p>
            <p>Criado em: {formattedDate}</p>
          </div>
        </div>
      </main>
      
      <div className={styles.absolute}>
      <div className={styles.relative}>
      <div className={styles.config_menu}>

        <button 
          type="button" 
          onClick={() => {
            handleSelectArchive(file)
            handleOpenModal()
          }}
        >
          Visualizar
          <Image src={viewSVG} alt="Botão de alterar atividade"/>
        </button>
    

        <button type="button" 
          className={styles.delete_button} 
          onClick={() => {
            handleDelete()
            setIsLoading(true)
          }}
        >
          {isLoading ? (
            <Loading type="spin" width={24} height={24} color="#fff"/>
          ) : (
            <>
            Deletar
           <Image src={trashSVG} alt="Botão de alterar atividade"/>
            </>
          )}
          
        </button>
      </div>

      <button type="button" className={styles.config_button}>
        <Image src={details_vertical} alt="Botão de configuração"/>
      </button>
      </div>
    </div>
    </motion.div>
  )
}