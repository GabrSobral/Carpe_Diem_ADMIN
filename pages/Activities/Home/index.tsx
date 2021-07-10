import styles from './styles.module.scss'

import { ActivitiesBar } from '../../../components/ActivitiesBar'
import { ActivityContent } from '../../../components/ActivityContent'

export default function Activities(){
  return(
    <div className={styles.home_page}>
      <div className={styles.content}>
        <ActivityContent/>
      </div>

      <ActivitiesBar/>
    </div>
  )
}