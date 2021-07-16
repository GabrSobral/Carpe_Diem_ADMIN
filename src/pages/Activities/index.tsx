import styles from './styles.module.scss'

import { SelectModal } from '../../components/SelectModal'
import { InformationBar } from '../../components/InformationBar'
import { ActivityContent } from '../../components/ActivityContent'
import { CreateActivityContent } from '../../components/CreateActivityContent'
import { UpdateActivityContent } from '../../components/UpdateActivityContent'

import { CreateActivityProvider } from '../../contexts/CreateActivityContext'

import { usePage } from '../../hooks/usePage'
import { useModal } from '../../hooks/useModal'

export default function Activities(){
  const { isOpenArchives, isOpenCategory } = useModal()
  const { page } = usePage()
  
  return(
    <div className={styles.home_page}>   
    <CreateActivityProvider>
      <div className={styles.content}>
        { isOpenCategory && <SelectModal type="category" /> }
        { isOpenArchives && <SelectModal type="archive" /> }

        { page === "ActivityDetails" && ( <ActivityContent/> )}
        { page === "ActivityCreate" && ( <CreateActivityContent/> )}
        { page === "ActivityUpdate" && ( <UpdateActivityContent/> )}
        
      </div>
      <InformationBar/>
    </CreateActivityProvider>
    </div>
  )
}