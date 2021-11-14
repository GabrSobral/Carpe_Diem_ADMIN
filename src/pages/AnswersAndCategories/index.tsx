import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AnswersAndCategoriesContent } from '../../components/AnswersAndCategoriesContent'
import { InformationBar } from '../../components/InformationBar'
import { AnswersAndCategoriesProvider } from '../../contexts/AnswersAndCategoriesContext'
import { useAnswersAndCategories } from '../../hooks/useAnswersAndCategories'

export default function AnswersAndCategories(){
  return(
    <div className="home_page" style={{ display: 'flex' }}>
      <AnswersAndCategoriesProvider>
        <div className="content">
          <AnswersAndCategoriesContent/>
        </div>
        <InformationBar type="categories"/>
      </AnswersAndCategoriesProvider>
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