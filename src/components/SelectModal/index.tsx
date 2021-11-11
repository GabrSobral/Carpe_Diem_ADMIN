import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { SelectModalButton } from '../SelectModalButton'

import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'

import styles from './styles.module.scss'
import { api } from '../../services/api'
import { ModalContainer } from '../ModalContainer'

interface ModalProps{
  handleSelectData: (value: any) => void;
  handleModalClose: () => void;
  title: string;
  fetchFunction: () => Promise<any>;
  isVisible: boolean;
  alreadyExists: any[]
}

export function SelectModal({ 
  handleSelectData, 
  handleModalClose,
  title,
  fetchFunction,
  isVisible,
  alreadyExists
}: ModalProps){
  const [ selectData, setSelectData ] = useState<any>()
  const [ data, setData] = useState<any>([])

  useEffect(() => {
    (async function(){
      const fetchData = await fetchFunction()
      setData(fetchData)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleSetSelectData(){
    if(selectData)
      handleSelectData(selectData)

    handleModalClose()
  }

  return(
    <ModalContainer selector="#modal">
      <AnimatePresence exitBeforeEnter>
        {
          isVisible &&
          <motion.div 
            className={styles.background}
            layout
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2 }}  
          >

            <motion.div 
              layout 
              className={styles.popup}
              initial={{ opacity: 0, scale: 0.8}}
              animate={{ opacity: 1, scale: 1}}
              exit={{ opacity: 0, scale: 0}}
              transition={{ duration: 0.2 }}    
            >
              <div className={styles.title}>
                <span>{title}</span>    
              </div>

              <main className={styles.main}>
                {data.length == 0 ? <Loading type="spin" width={52} height={52} color="#5A63B1"/>
                  : data.map((item: any) => {
                      if(alreadyExists.some((alreadyExistsItem: any) => alreadyExistsItem?.id === item.id))
                        return <div style={{ display: "none" }} key={item.id}/>

                      return (
                        <SelectModalButton 
                          title={item.title || item.name}
                          category={item.name || item.format}
                          key={item.id}
                          isActive={selectData?.id === item.id ? true : false}
                          onClick={() => setSelectData(item)}
                        />)
                  })}
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
            </motion.div>

          </motion.div>
        }
      </AnimatePresence>
    </ModalContainer>
  )
}