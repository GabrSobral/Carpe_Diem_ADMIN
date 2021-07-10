import { ActivitiesBar } from '../../../components/ActivitiesBar'

import { CreateActivityContent } from '../../../components/CreateActivityContent'
import { SelectModal } from '../../../components/SelectModal'
import { useModal } from '../../../hooks/useModal'
import styles from './styles.module.scss'

export default function CreateActivity(){
  const { isOpenArchives, isOpenCategory } = useModal()
  return(
    <div className={styles.home_page}>
      { isOpenCategory && <SelectModal type="category"/> }
      { isOpenArchives && <SelectModal type="archive" /> }

      <div className={styles.content}>
        <CreateActivityContent/>
      </div>

      <ActivitiesBar/>
    </div>
  )
}