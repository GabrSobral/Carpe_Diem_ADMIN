import { useEffect, useState } from 'react'
import Image from 'next/image'

import { ActivityItem } from '../ActivityItem'

import searchSVG from '../../images/search.svg'
import reloadSVG from '../../images/reload.svg'

import styles from './styles.module.scss'
import { useActivity } from '../../hooks/useActivity'
import { api } from '../../services/api'
import { usePage } from '../../hooks/usePage'

export function ActivitiesBar(){
  const [ search, setSearch ] = useState<string>('')
  const { activities, handleSelectActivity, handleSetActivities } = useActivity()
  const [ reload, setReload] = useState(false)
  const { handleSetPage } = usePage()

  useEffect(() => {
    api.get('/activity/list').then(({ data }) => {
      handleSetActivities(data)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reload])

  return(
    <aside className={styles.container}>
      <header>
        <div className={styles.search_bar}>
          <button type="button">
            <Image src={searchSVG} alt="pesquisar"/>
          </button>
            <input 
              type="text" 
              placeholder="Pesquise"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
        </div>

        <h4>Todas as Atividades</h4>

        <button type="button" onClick={() => setReload(!reload)}>
          <Image src={reloadSVG} alt="recarregar"/>
        </button>
      </header>

      <main>
        { activities?.filter(value => {
          if(search === ''){
            return value
          }else if(value.title.toLowerCase().includes(search.toLowerCase())){
              return value
          }
        }).map(item => (
            <ActivityItem 
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              body={item.body}
              category={item.category}
              onClick={() => {
                handleSelectActivity(item); 
                setSearch('');
                handleSetPage("ActivityDetails")
              }}
            />
          ))
        }
      </main>
    </aside>
  )
}