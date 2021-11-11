import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { ArchivesListContent } from '../../components/ArchivesListContent'

import { InformationBar } from '../../components/InformationBar'
import { ArchiveProvider } from '../../contexts/ArchivesContext'

export default function Archives(){
  return(
    <div className="home_page" style={{ display: 'flex' }}>
      <ArchiveProvider>
        <div className='content'>
          <ArchivesListContent/>
        </div>
        <InformationBar type="archives"/>
      </ArchiveProvider>
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