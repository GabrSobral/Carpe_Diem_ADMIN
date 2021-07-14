import Image from 'next/image'
import { useActivity } from '../../hooks/useActivity'

import musicSVG from '../../images/music.svg'

import styles from './styles.module.scss'

interface ActivityItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  id: string;
  title: string;
  description: string;
  body: string;
  category: string
}

export function ActivityItem({ title, category, description, id, ...rest }: ActivityItemProps){
  const { activity } = useActivity()
  return(
    <button 
      type="button" 
      className={`${styles.container} ${id === activity?.id ? styles.active : ''}`}
      {...rest}
    >
      <div className={styles.icon_container}>
        <div className={styles.image_container}>
          <Image src={musicSVG} alt="Icone da categoria"/>
        </div>
      </div>

      <div className={styles.content}>
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </button>
  )
}