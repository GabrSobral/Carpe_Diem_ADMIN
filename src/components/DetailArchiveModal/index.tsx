/* eslint-disable @next/next/no-img-element */
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image';
import filesize from 'filesize'

import { FileProps } from '../../@types/Activity';
import { Player } from '../Player'

import styles from './styles.module.scss'
import { ModalContainer } from '../ModalContainer';

interface DetailArchiveProps{
  handleCloseModal: () => void;
  handleRemoveArchive?: (index: number) => void;
  file: SelectedArchive | undefined;
  isVisible: boolean;
}
interface SelectedArchive {
  file: FileProps;
  index: number;
}

export function DetailArchiveModal(
  { handleCloseModal, handleRemoveArchive, file, isVisible }: DetailArchiveProps){
  const date = Date.parse(String(file?.file.created_at)) || new Date()
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH:mm")

  return(
    <ModalContainer selector="#modal">
      <AnimatePresence>
        {
          isVisible &&
          <motion.div 
            className={styles.background}
            layout
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2 }}   
          >
            <motion.div 
              className={styles.container_detailArchiveModal}
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              exit={{ opacity: 0}}
              transition={{ duration: 0.2 }}   
            >
              <header>

                { file?.file.format === "mp4" && (
                  <video controls className={styles.video}>
                    <source src={file?.file.url} type="video/mp4"/>
                    Your browser does not support the video tag.
                  </video>
                ) }

                { file?.file.format === "mp3" && (
                  <div className={styles.audio_files}>
                    <Player 
                      name={file?.file.name || ''}
                      url={file?.file.url || ''}
                      duration={file?.file.duration || 0}
                    />
                  </div>
                )}

                { file?.file.format === "png" && (
                  <Image 
                      src={file?.file.url} 
                      alt="Imagem do arquivo" 
                      className={styles.image}
                      width={512}
                      height={288}
                      objectFit='cover'
                    />
                )}
                
              </header>
              
              <main className={styles.main}>
                <span className={styles.title}>{file?.file.name}</span>
                <div>
                  <span><strong>Formato: </strong>{file?.file.format}</span>
                  <span><strong>Size: </strong>{filesize(file?.file.size || 0)}</span>
                  <span><strong>Criado em: </strong>{formattedDate}</span>
                </div>
              </main>

              <div className={styles.buttons_container}>
                { handleRemoveArchive && (
                  <button type="button" onClick={() => {handleRemoveArchive(Number(file?.index)); handleCloseModal()}}>
                    Remover anexo
                  </button>
                )}

                <button type="button" onClick={handleCloseModal}>
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </ModalContainer>
  )
}