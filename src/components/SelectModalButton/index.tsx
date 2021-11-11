import Image from "next/image"

import musicSVG from '../../images/music.svg'
import { Icons } from "../Icons"

import styles from './styles.module.scss'

interface SelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  isActive?: boolean;
  title: string;
  category: string
}

export function SelectModalButton({ isActive = true, title, category, ...rest }: SelectButtonProps){
  return(
    <button 
      type="button" 
      className={`${styles.container} ${isActive ? styles.active : ''}`}
      {...rest}
    >
      <div className={styles.select_icon}>
        <Icons name={category}/>
      </div>
      <div className={styles.select_name}>
        {title}
      </div>
    </button>
  )
}