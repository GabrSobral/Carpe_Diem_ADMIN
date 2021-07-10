import type { AppProps } from 'next/app'

import { SideBar } from '../components/SideBar'
import { useRouter } from 'next/router'

import '../styles/globals.scss'
import styles from '../styles/app.module.scss'
import { ModalProvider } from '../contexts/modal'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const url = pathname.split('/')

  return (
    <div className={styles.pages}>
      <SideBar active={url[1]}/>

      <main className={styles.main}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </main>
    </div>
  )
}
export default MyApp
