import { Icons } from "../Icons"

import styles from './styles.module.scss'

interface SelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  isActive?: boolean;
  title: string;
  icon: string;
}

export function SelectButton({ isActive = false, title, icon,...rest}: SelectButtonProps){
  return(
    <button 
      type="button" 
      className={`${styles.container} ${isActive && styles.active}`}
      {...rest}
    >
      <div className={styles.select_icon}>
        <Icons name={icon}/>
      </div>
      <div className={styles.select_name}>
        {title}
      </div>
    </button>
  )
}