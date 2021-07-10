import Image from 'next/image'

import playSVG from '../../images/play.svg'
import styles from './styles.module.scss'

export function Player(){
  return(
    <div className={styles.playerContainer}>
      <div className={styles.player}>
        <button type="button">
          <Image src={playSVG} alt="Tocar música" />
        </button>

        <div className={styles.playerControllers}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div></div>
          </div>
          <span>03:56</span>
        </div>
      </div>
      <span className={styles.audio_name}>Música_relaxante.mp3</span>
    </div>
  )
}