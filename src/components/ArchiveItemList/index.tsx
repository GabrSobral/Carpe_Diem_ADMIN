import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import Image from 'next/image';

import checkSVG from '../../images/check.svg'
import XSVG from '../../images/x.svg'

import 'react-circular-progressbar/dist/styles.css';
import { UploadArchivesProps } from '../../contexts/ArchivesContext';
import styles from './styles.module.scss'

interface ArchiveItemListProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  file: UploadArchivesProps
}

export function ArchiveItemList({ file }: ArchiveItemListProps){
  return(
    <div className={`${styles.container_archive}`}>
      <div className={styles.icon_container_archive}>
        <div className={styles.image_container_archive}>
          { !file.uploaded && !file.error && (
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
          { file.error && <Image src={XSVG} alt="Icone de erro"/>}
          
        </div>
      </div>

      <div className={styles.content_archive}>
        <span>{file.name}</span>
        <p>descrição hihihi</p>
        <button type="button">Cancelar</button>
      </div>
    </div>
  )
}