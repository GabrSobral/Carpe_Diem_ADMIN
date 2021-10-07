import type { AppProps } from 'next/app'

import { SideBar } from '../components/SideBar'
import { useRouter } from 'next/router'


import { ActivityProvider } from '../contexts/ActivityContext'
import { PageProvider } from '../contexts/PageContext'
import { AuthProvider } from '../contexts/AuthContext'
import { CreateActivityProvider } from '../contexts/CreateActivityContext'

import '../styles/globals.scss'
import styles from '../styles/app.module.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {  
  const { pathname } = useRouter()
  const url = pathname.split('/')
     
  return (
    <div className={styles.pages}>

      <Head>
        <title>Carpe Diem - Dashboard</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <AuthProvider>
        <ActivityProvider>
          <PageProvider>
            {url[1] && <SideBar active={url[1]}/>}

            <div className={styles.main_app}>
              <CreateActivityProvider>
                <Component {...pageProps} />
              </CreateActivityProvider>
            </div>
          </PageProvider>
        </ActivityProvider>
      </AuthProvider>
    </div>
 )
}
export default MyApp
