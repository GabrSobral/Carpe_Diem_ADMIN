import styles from './styles.module.scss'

import { SideBar } from '../../components/SideBar'
import { ActivitiesBar } from '../../components/ActivitiesBar'
import { ActivityContent } from '../../components/ActivityContent'

export default function Activities(){
  return(
    <div className={styles.home_page}>
      <SideBar active="activities"/>
      
      <main>
        <div className={styles.content}>
          <ActivityContent/>
        </div>

        <ActivitiesBar/>
      </main>
    </div>
  )
}