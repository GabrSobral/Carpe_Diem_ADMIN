import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loading from 'react-loading'

import xSVG from '../../../images/x.svg'
import checkSVG from '../../../images/check.svg'

import { api } from '../../../services/api'
import { SelectModalButton } from '../../SelectModalButton'

import styles from './styles.module.scss'

interface ModalProps{
  handleSelectData: (value: any) => void;
  handleModalClose: () => void
}

export function Modal({ handleSelectData, handleModalClose }: ModalProps){
  const [ selectData, setSelectData ] = useState<any>()
  const [ data, setData] = useState<any>([])

  useEffect(() => {
    (async function(){
      const { data } = await api.get('/category/list')
      setData(data)
    })()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
          <span>Selecione uma categoria</span>    
        </div>

        <main>
          {
            data.length == 0 ? (
              <Loading type="spin" width={52} height={52} color="#5A63B1"/>
            ) :  
              data.map((item: any) => (
                <SelectModalButton 
                  title={item.title || item.name} 
                  key={item.id}
                  isActive={selectData?.id === item.id ? true : false}
                  onClick={() => setSelectData(item)}
                />
            ))
          }
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