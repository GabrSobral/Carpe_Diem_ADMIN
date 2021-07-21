import styles from './styles.module.scss'

import { SelectModal } from '../../components/SelectModal'
import { InformationBar } from '../../components/InformationBar'
import { ActivityContent } from '../../components/ActivityContent'
import { CreateActivityContent } from '../../components/CreateActivityContent'
import { UpdateActivityContent } from '../../components/UpdateActivityContent'

import { usePage } from '../../hooks/usePage'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'


export default function Activities(){
  const { page } = usePage()
  
  return(
    <div className={styles.home_page}> 
      <div className={styles.content}>
        
        { page === "ActivityDetails" && ( <ActivityContent/> )}
        { page === "ActivityCreate" && ( <CreateActivityContent/> )}
        { page === "ActivityUpdate" && ( <UpdateActivityContent/> )}
        
      </div>
      <InformationBar/>
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