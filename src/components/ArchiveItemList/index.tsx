import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import Image from 'next/image';

import checkSVG from '../../images/check.svg'
import XSVG from '../../images/x.svg'
import alertSVG from '../../images/alert-circle.svg'

import 'react-circular-progressbar/dist/styles.css';
import { UploadArchivesProps } from '../../contexts/ArchivesContext';
import styles from './styles.module.scss'
import { useArchive } from '../../hooks/useArchive';
import fileSize from 'filesize';
import { motion } from 'framer-motion';
import { fi } from 'date-fns/locale';

interface ArchiveItemListProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  file: UploadArchivesProps
}

export function ArchiveItemList({ file }: ArchiveItemListProps){
  const { cancelUpload } = useArchive()

  return(
    <motion.div 
      className={`
        ${styles.container_archive} 
        ${file.uploaded && styles.uploaded} 
        ${file.canceled && styles.canceled} 
        ${file.error && styles.error}`}
      initial={{ opacity: 0, y: -50}}
      animate={{ opacity: 1, y: 0 }}
      >
      <div className={styles.icon_container_archive}>
        <div className={styles.image_container_archive}>
          { !file.uploaded && !file.error && !file.canceled && (
            <CircularProgressbar 
              value={file.progress || 0} 
              text={`${file.progress}%`}
              className={styles.circularProgressBar}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#36F36D",
                textColor: "#fff"
              })}
            />
          )}
          { file.uploaded && <Image src={checkSVG} alt="Icone de sucesso"/>}
          { file.error && <Image src={alertSVG} alt="Icone de erro"/>}
          { file.canceled && <Image src={XSVG} alt="Icone de cancelado"/>}
          
        </div>
      </div>

      <div className={styles.content_archive}>
        <span>{file.name}</span>
        <p>{fileSize(file.size)}</p>

        { file.canceled && (<span className={styles.title_canceled}>Cancelado</span>) }
        { (!file.uploaded && 
          !file.canceled && 
          !file.error &&
          ( file.progress !== 100)) &&
          <button
            type="button" 
            onClick={() => cancelUpload(file.id, file.cancelToken)}
          >
            Cancelar
          </button>}
       
      </div>
    </motion.div>
  )
}