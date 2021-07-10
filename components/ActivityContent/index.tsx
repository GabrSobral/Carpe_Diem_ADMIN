import { ConfigButton } from '../ConfigButton'
import { HeaderContent } from '../HeaderContent'
import { Player } from '../Player'

import styles from './styles.module.scss'

export function ActivityContent(){
  return(
    <div className={styles.container}>
      <HeaderContent/>

      <main>
        <div className={styles.title_subtitle}>
          <h1>Ouça e relaxe</h1>
          <span className={styles.subtitle}>Ouça uma música relaxante, para esvaziar a sua mente.</span>
          <span className={styles.created_at}>Criado em: 08/07/2021 ás 15: 32</span>
        </div>

        <div className={styles.description}>
          <p>Ouça músicas relaxantes, para ezvaziar a sua mente e acalmar o seu subconsciente.</p>
          <p>Esse tipo de exercício é muito útil para se livrar do estresse e dos pensamentos corriqueiros do dia a dia.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
          <p>Você pode tentar meditar enquanto escuta as músicas, isso fará você ter um maior proveito do exercícío.</p>
        </div>

         <div className={styles.files}>
          <span>Arquivos: 1</span>

          <div className={styles.audio_files}>
            <Player/>
            <Player/>
          </div>
        </div>      
      </main>

      <ConfigButton/>
    </div>
  )
}