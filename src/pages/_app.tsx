import type { AppProps } from 'next/app'

import { SideBar } from '../components/SideBar'
import { useRouter } from 'next/router'

import '../styles/globals.scss'

import { ModalProvider } from '../contexts/modal'
import { ActivityProvider } from '../contexts/ActivityContext'
import { PageProvider } from '../contexts/PageContext'

import styles from '../styles/app.module.scss'

import { ArchiveProvider } from '../contexts/ArchivesContext'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {  
  const { pathname } = useRouter()
  const url = pathname.split('/')
     
  return (
    <div className={styles.pages}>
      <AuthProvider>
        <ActivityProvider>
          <ArchiveProvider>
            <PageProvider>
              {url[1] && <SideBar active={url[1]}/>}

              <main className={styles.main}>
                <ModalProvider>
                  <Component {...pageProps} />
                </ModalProvider>
              </main>
            </PageProvider>
          </ArchiveProvider>
        </ActivityProvider>
      </AuthProvider>
    </div>
 )
}
export default MyApp
