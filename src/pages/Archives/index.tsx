import { ArchivesListContent } from '../../components/ArchivesListContent'

import { InformationBar } from '../../components/InformationBar'

import styles from './styles.module.scss'

export default function Archives(){
  return(
    <div className={styles.home_page}>   
      <div className={styles.content}>
        <ArchivesListContent/>
      </div>
      <InformationBar type="archives"/>
    </div>
  )
}