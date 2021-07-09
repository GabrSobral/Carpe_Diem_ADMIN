import { useState } from 'react'
import Image from 'next/image'

import { ActivityItem } from '../ActivityItem'

import searchSVG from '../../images/search.svg'
import reloadSVG from '../../images/reload.svg'

import styles from './styles.module.scss'

export function ActivitiesBar(){

  return(
    <aside className={styles.container}>
      <header>
        <div className={styles.search_bar}>
          <button type="button">
            <Image src={searchSVG} alt="pesquisar"/>
          </button>
            <input type="text" placeholder="Pesquise"/>
        </div>

        <h4>Todas as Atividades</h4>

        <button type="button">
          <Image src={reloadSVG} alt="recarregar"/>
        </button>
      </header>

      <main>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
        <ActivityItem/>
      </main>
    </aside>
  )
}