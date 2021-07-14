import { Player } from '../Player'

import styles from './styles.module.scss'

interface DetailArchiveProps{
  handleCloseModal: () => void;
  handleRemoveArchive: (index: number) => void;
  file: SelectedArchive | undefined;
}
interface ArchiveProps{
  id: string;
  name: string | undefined;
  format: string | undefined;
  duration: number | undefined;
  url: string | undefined;
  author: string | undefined;
}
interface SelectedArchive {
  file: ArchiveProps;
  index: number;
}

export function DetailArchiveModal({ handleCloseModal, handleRemoveArchive, file }: DetailArchiveProps){
  return(
    <div className={styles.background}>
      <div className={styles.container}>
        <header>
          {
            file?.file.format === "mp4" ? ( 
              <video controls className={styles.video}>
                <source src={file?.file.url} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              ) : (
              <div className={styles.audio_files}>
                <Player 
                  name={file?.file.name || ''}
                  url={file?.file.url || ''}
                  duration={file?.file.duration || 0}
                />
              </div>
            )
          }
        </header>
        
        <main className={styles.main}>
          <h1>{file?.file.name}</h1>
          <div>
            <span><strong>Formato: </strong>{file?.file.format}</span>
            <span><strong>Autor: </strong>{file?.file.author}</span>
          </div>
        </main>

        <div className={styles.buttons_container}>
          <button type="button" onClick={() => {handleRemoveArchive(Number(file?.index)); handleCloseModal()}}>
            Remover anexo
          </button>
          <button type="button" onClick={handleCloseModal}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}