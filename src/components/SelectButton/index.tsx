import Image from "next/image"
import musicSVG from '../../images/music.svg'

import styles from './styles.module.scss'

interface SelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  isActive?: boolean;
  title: string;
}

export function SelectButton({ isActive = false, title, ...rest}: SelectButtonProps){
  return(
    <button 
      type="button" 
      className={`${styles.container} ${isActive && styles.active}`}
      {...rest}
    >
      <div className={styles.select_icon}>
        <Image src={musicSVG} alt="Icone de música"/>
      </div>
      <div className={styles.select_name}>
        {title}
      </div>
    </button>
  )
}