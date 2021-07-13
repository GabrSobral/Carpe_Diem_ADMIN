import Image from 'next/image'

import musicSVG from '../../images/music.svg'

import styles from './styles.module.scss'

export function ActivityItem(){
  return(
    <button type="button" className={styles.container}>
      <div className={styles.icon_container}>
        <div className={styles.image_container}>
          <Image src={musicSVG} alt="Icone da categoria"/>
        </div>
      </div>

      <div className={styles.content}>
        <span>Ouça e relaxe</span>
        <p>Ouça uma música relaxante, para esvaziar a sua mente.</p>
      </div>
    </button>
  )
}