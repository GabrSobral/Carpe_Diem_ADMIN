import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AnswersAndCategoriesContent } from '../../components/AnswersAndCategoriesContent'
import { InformationBar } from '../../components/InformationBar'
import styles from './styles.module.scss'

export default function AnswersAndCategories(){
  return(
    <div className={styles.home_page}>   
      <div className={styles.content}>
        <AnswersAndCategoriesContent/>
      </div>
      <InformationBar type="categories"/>
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