import type { AppProps } from 'next/app'

import { SideBar } from '../components/SideBar'
import { useRouter } from 'next/router'

import '../styles/globals.scss'

import { ModalProvider } from '../contexts/modal'
import { ActivityProvider } from '../contexts/ActivityContext'
import { PageProvider } from '../contexts/PageContext'
import { AuthProvider } from '../contexts/AuthContext'

import styles from '../styles/app.module.scss'


function MyApp({ Component, pageProps }: AppProps) {  
  const { pathname } = useRouter()
  const url = pathname.split('/')
     
  return (
    <div className={styles.pages}>
      <AuthProvider>
        <ActivityProvider>
            <PageProvider>
              {url[1] && <SideBar active={url[1]}/>}

              <main className={styles.main}>
                <ModalProvider>
                  <Component {...pageProps} />
                </ModalProvider>
              </main>
            </PageProvider>
        </ActivityProvider>
      </AuthProvider>
    </div>
 )
}
export default MyApp
