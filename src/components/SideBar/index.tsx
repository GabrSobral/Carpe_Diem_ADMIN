import styles from './styles.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

import ActivitiesSVG from '../../images/activities_bar.svg'
import ArchivesSVG from '../../images/archives_bar.svg'
import UsersSVG from '../../images/users_bar.svg'
import LogOutSVG from '../../images/logout_bar.svg'
import { usePage } from '../../hooks/usePage'

interface SideBarProps {
  active: string;
}

export function SideBar({ active }: SideBarProps){
  const { push } = useRouter()
  const { handleSetPage } = usePage()

  function handleNavigate(page: string){
    switch(page){
      case "Activities" : {
        push("/Activities/Home"); break;
      }
      case "Archives" : {
        push("/Archives"); break;
      }
      case "Users" : {
        push("/Users"); break;
      }
    }
  }

  return(
    <aside className={styles.container}>
      <div/>
      <nav className={styles.buttons_container}>
        <button
          type="button" 
          className={active == "Activities" ? styles.active : ''}
          onClick={() => {
            handleSetPage("ActivityDetails")
            handleNavigate("Activities")
          }}
        >
          <Image src={ActivitiesSVG} alt="icone de atividades"/>

          <div className={styles.button_hover}> 
            <span>Atividades</span> 
          </div>
        </button>
      
        <button type="button" className={active == "Archives" ? styles.active : ''}>
          <Image src={ArchivesSVG} alt="icone de arquivos"/>

          <div className={styles.button_hover}> 
            <span>Arquivos</span> 
          </div>
        </button>

        <button type="button" className={active == "Users" ? styles.active : ''}>
          <Image src={UsersSVG} alt="icone de usuários"/>

          <div className={styles.button_hover}> 
            <span>Usuários</span> 
          </div>
        </button>
      </nav>
      
      <button type="button">
        <Image src={LogOutSVG} alt="icone de usuários"/>

        <div className={styles.button_hover}> 
          <span>Sair</span> 
        </div>
      </button>
    </aside>
  )
}