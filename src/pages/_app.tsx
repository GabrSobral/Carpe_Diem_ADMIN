import type { AppProps } from 'next/app'

import { SideBar } from '../components/SideBar'
import { useRouter } from 'next/router'

import '../styles/globals.scss'
import styles from '../styles/app.module.scss'
import { ModalProvider } from '../contexts/modal'
import { ActivityProvider } from '../contexts/ActivityContext'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const url = pathname.split('/')

  return (
    <div className={styles.pages}>
      {url[1] && <SideBar active={url[1]}/>}

      <main className={styles.main}>
        <ModalProvider>
          <ActivityProvider>
            <Component {...pageProps} />
          </ActivityProvider>
        </ModalProvider>
      </main>
    </div>
  )
}
export default MyApp
