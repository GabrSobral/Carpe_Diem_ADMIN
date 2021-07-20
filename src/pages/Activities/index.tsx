import styles from './styles.module.scss'

import { SelectModal } from '../../components/SelectModal'
import { InformationBar } from '../../components/InformationBar'
import { ActivityContent } from '../../components/ActivityContent'
import { CreateActivityContent } from '../../components/CreateActivityContent'
import { UpdateActivityContent } from '../../components/UpdateActivityContent'

import { CreateActivityProvider } from '../../contexts/CreateActivityContext'

import { usePage } from '../../hooks/usePage'
import { useModal } from '../../hooks/useModal'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useCreateActivity } from '../../hooks/useCreateActivity'

export default function Activities(){
  const { isOpenArchives, isOpenCategory } = useModal()
  const { page } = usePage()
  const { handleSetCategory, handleSetArchive } = useCreateActivity()
  
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@CarpeDiem-Token'] : token } = parseCookies(ctx)

  if(!token){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return{
    props: {

    }
  }
}