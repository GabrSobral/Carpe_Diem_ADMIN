import { FileProps } from '../../@types/Activity';
import { Player } from '../Player'

import styles from './styles.module.scss'

interface DetailArchiveProps{
  handleCloseModal: () => void;
  handleRemoveArchive: (index: number) => void;
  file: SelectedArchive | undefined;
}
interface SelectedArchive {
  file: FileProps;
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
          <span className={styles.title}>{file?.file.name}</span>
          <div>
            <span><strong>Formato: </strong>{file?.file.format}</span>
            <span><strong>Size: </strong>{file?.file.size}</span>
            <span><strong>Criado em: </strong>{file?.file.created_at}</span>
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