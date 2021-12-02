import { format } from 'date-fns'
import LottieView from 'react-lottie'
import Loading from "react-loading";
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Chart } from "react-google-charts"

import { useActivity } from '../../hooks/useActivity'
import { ConfigButton } from '../ConfigButton'
import { HeaderContent } from '../HeaderContent'
import { Player } from '../Player'

import ActivityAnim from '../../images/Activity.json'
import styles from './styles.module.scss'

export function ActivityContent(){
  const { activity } = useActivity()

  const date = Date.parse(String(activity?.created_at)) || new Date()
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH:mm")

  return(
    <div className={styles.container_ActivityContent}>
      <HeaderContent/>
      {
        activity ? (
          <>
          <main key="Activities" className={styles.activityContentMain}>
          <motion.div className={styles.title_subtitle}>
            <h1>{activity?.title}</h1>
            <span className={styles.subtitle}>{activity?.description}</span>
            <span className={styles.created_at}>Criado em: {formattedDate}</span>
          </motion.div>
  
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: activity?.body as string}}>
            </div>

            <div className={styles.chartContainer}>
              <Chart
                width={'100%'}
                chartType="BarChart"
                loader={
                  <div style={{ marginLeft: "49%" }}>
                    <Loading 
                      type='spin'
                      width={24} 
                      height={24} 
                      color="#616BC5"
                    />
                  </div>}
                data={[
                  ['Feedback', 'Gostaram', 'Não gostaram'],
                  [ activity.title, 
                    activity.feedback ? activity?.feedback.goodCount : 0, 
                    activity.feedback ? activity?.feedback.badCount : 0 ],
                ]}
                
                options={{
                  is3D: true,
                  title: 'Quantidade de feedbacks da atividade',
                  chartArea: { width: '70%'},
                  colors:["#83CD98", '#DE8D8D'],
                  height: 200,
                  hAxis: {
                    title: 'Quantidade',
                    minValue: 0,
                    viewWindow:{min:0},
                    format: '0',
                  },
                  animation: {
                    duration: 250,
                    easing: 'out',
                    startup: true,
                  },
                }}
              />
            </div>
            
  
            <div className={styles.files}>
              <span>Arquivos: {activity?.files.length}</span>
    
              {activity?.files.map(item => {
                  
                  if(item.format === "mp4"){
                    return(
                      <video controls className={styles.video} key={item.id}>
                        <source src={item.url} type="video/mp4"/>
                        Your browser does not support the video tag.
                      </video>
                    )
                  }
        
                  if(item.format === "mp3"){
                    return(
                      <div className={styles.audio_files} key={item.id}>
                        <Player 
                          name={item.name || ''}
                          url={item.url || ''}
                          duration={item.duration || 0}
                        />
                      </div>
                    )
                  }
        
                  if(item.format === "png"){
                    return(
                      <div className={styles.image} key={item.id}>
                        <Image 
                          key={item.id}
                          src={item.url} 
                          alt="Imagem do arquivo" 
                          width={512}
                          height={288}
                          objectFit="contain"
                      />
                      
                      </div>
                      
                    )
                  }

                  if(item.format === "jpg"){
                    return(
                      <div className={styles.image} key={item.id}>
                        <Image 
                          key={item.id}
                          src={item.url} 
                          alt="Imagem do arquivo" 
                          width={512}
                          height={288}
                          objectFit="contain"
                      />

                      
                      </div>
                      
                    )
                  }
                  return 
              })}
    
            </div>      
          </main>
    
          <ConfigButton/>
        </>
        ) : (
          <div className={styles.no_activity_selected}>
            <LottieView
              height={300}
              width={300}
              options={{ 
                animationData: ActivityAnim,
                autoplay: true,
                loop: true,
              }}
            />
            <h3>Nenhuma atividade selecionada.</h3>
          </div>
        )
      }
    </div>
  )
}