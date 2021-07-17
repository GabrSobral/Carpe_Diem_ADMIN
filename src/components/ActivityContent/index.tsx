import { format } from 'date-fns'
import { useState } from 'react'

import { useActivity } from '../../hooks/useActivity'
import { ConfigButton } from '../ConfigButton'
import { HeaderContent } from '../HeaderContent'
import { Player } from '../Player'

import styles from './styles.module.scss'

export function ActivityContent(){
  const { activity } = useActivity()

  const date = Date.parse(String(activity?.created_at)) || new Date()
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH:mm")

  return(
    <div className={styles.container}>
      <HeaderContent/>
      {
        activity ? (
          <>
          <main>
          <div className={styles.title_subtitle}>
            <h1>{activity?.title}</h1>
            <span className={styles.subtitle}>{activity?.description}</span>
            <span className={styles.created_at}>Criado em: {formattedDate}</span>
          </div>
  
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: activity?.body as string}}>
          </div>
  
           <div className={styles.files}>
            <span>Arquivos: {activity?.files.length}</span>
  
            {
              activity?.files.map(item => {
                if(item.format === "mp4"){ 
                  return (
                    <>
                    <video controls className={styles.video}>
                      <source src={item.url} type="video/mp4"/>
                      Your browser does not support the video tag.
                    </video>
                    </>
                  )
                }
                return (
                  <div className={styles.audio_files} key={item.id}>
                    <Player 
                      name={item.name || ''}
                      url={item.url || ''}
                      duration={item.duration || 0}
                    />
                  </div>
                )
              })
            }
  
          </div>      
        </main>
  
        <ConfigButton/>
        </>
        ) : (
          <div className={styles.no_activity_selected}>
            <h1>Não tem nenhuma atividade selecionada</h1>
          </div>
        )
      }
    </div>
  )
}