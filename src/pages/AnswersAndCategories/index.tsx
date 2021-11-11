import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AnswersAndCategoriesContent } from '../../components/AnswersAndCategoriesContent'
import { InformationBar } from '../../components/InformationBar'

export default function AnswersAndCategories(){
  return(
    <div className="home_page" style={{ display: 'flex' }}>
      <div className="content">
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