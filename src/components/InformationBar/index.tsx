import { useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from 'react-loading'

import { ActivitiesList } from './ActivitiesList'

import searchSVG from '../../images/search.svg'
import reloadSVG from '../../images/reload.svg'

import styles from './styles.module.scss'
import { ArchivesList } from './ArchivesList'
import { CategoriesList } from './CategoriesList'
interface InformationBar{
  type?: "activities" | "archives" | "categories";
}

export function InformationBar({ type = "activities" }: InformationBar){
  const [ reload, setReload] = useState(false)
  const [ search, setSearch ] = useState<string>('')

  function handleSetSearch(value: string){ setSearch(value) }

  return(
    <aside className={styles.container}>
      <header>
        {type !== "archives" && (
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
        )}
        
        <h4>
          {type === "activities" && "Todas as Atividades"}
          {type === "archives" &&"Uploads"}
          {type === "categories" && "Todas as categorias"}
        </h4>

        {type !== "archives" && (
          <button type="button" onClick={() => setReload(!reload)}>
            <Image src={reloadSVG} alt="recarregar"/>
          </button>
        )}
      </header>

      <main>
          {type === "activities" &&(
            <ActivitiesList
              search={search}
              handleSetSearch={handleSetSearch}
              reload={reload}
            /> 
          )}
          {type === "archives" &&(
           <ArchivesList/>
          )}
          {type === "categories" &&(
           <CategoriesList/>
          )}
        
      </main>
    </aside>
  )
}