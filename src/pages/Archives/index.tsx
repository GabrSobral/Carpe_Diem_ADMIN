import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
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