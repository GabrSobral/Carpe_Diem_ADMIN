import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import Image from 'next/image'

import { SelectModalButton } from '../SelectModalButton'

import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'

import styles from './styles.module.scss'
import { api } from '../../services/api'

interface ModalProps{
  handleSelectData: (value: any) => void;
  handleModalClose: () => void;
  title: string;
  fetchFunction: () => Promise<any>
}

export function SelectModal({ 
  handleSelectData, 
  handleModalClose,
  title,
  fetchFunction
}: ModalProps){
  const [ selectData, setSelectData ] = useState<any>()
  const [ data, setData] = useState<any>([])

  useEffect(() => {
    (async function(){
      const fetchData = await fetchFunction()
      setData(fetchData)
    })()
  },[fetchFunction])

  function handleSetSelectData(){
    if(selectData){
      handleSelectData(selectData)
      handleModalClose()
    }
    handleModalClose()
  }

  return(
    <div className={styles.background}>

      <div className={styles.popup}>
        <div className={styles.title}>
          <span>{title}</span>    
        </div>

        <main className={styles.main}>
          {data.length == 0 ? <Loading type="spin" width={52} height={52} color="#5A63B1"/>
            : data.map((item: any) => (
                <SelectModalButton 
                  title={item.title || item.name} 
                  key={item.id}
                  isActive={selectData?.id === item.id ? true : false}
                  onClick={() => setSelectData(item)}
                />
          ))}
        </main>

        <nav className={styles.button_container}>
          <button type="button" onClick={handleModalClose}>
            <Image src={xSVG} alt="Cancelar"/>
            Cancelar
          </button>

          <button type="button" onClick={handleSetSelectData} disabled={!selectData}>
            <Image src={checkSVG} alt="Cancelar"/>
            Concluir
          </button>
        </nav>
      </div>

    </div>
  )
}