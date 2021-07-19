import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import Image from 'next/image'

import { SelectModalButton } from '../SelectModalButton'

import xSVG from '../../images/x.svg'
import checkSVG from '../../images/check.svg'

import { useModal } from '../../hooks/useModal'

import styles from './styles.module.scss'
import { api } from '../../services/api'
import { useCreateActivity } from '../../hooks/useCreateActivity'
import { CreateActivityProvider } from '../../contexts/CreateActivityContext'

interface ModalProps{
  type: 'category' | 'archive';
}

export function SelectModal({ type }: ModalProps){
  const { 
    handleModalCategory,
    handleModalArchives,
    handleSetCategories,
    handlesetArchives,
    archives,
    categories
   } = useModal()
  const { handleSetArchive, handleSetCategory } = useCreateActivity()
  const [ selectData, setSelectData ] = useState<any>()
  const [ data, setData] = useState<any>([])

  useEffect(() => {
    if(type === 'category'){
      // if(categories.length !== 0){
      //   setData(categories)
      //   return
      // }
      api.get('/category/list').then(({ data }) => {
        handleSetCategories(data)
        setData(data)
      })
    }
    if(type === 'archive'){
      // if(archives.length !== 0){
      //   setData(archives)
      //   return
      // }
      api.get('/archive/list').then(({ data }) => {
        handlesetArchives(data)
        setData(data)
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type])

  function handleModalClose(){
    if(type === 'category'){ handleModalCategory() }
    if(type === 'archive'){ handleModalArchives() }
  }

  function handleSelectData(value: any){
    if(type === 'category'){ 
      handleSetCategory(value) 
    }
    if(type === 'archive'){ 
      handleSetArchive(value) 
    }
  }
  function handleSetSelectData(){
    if(selectData){
      handleSelectData(selectData)
      handleModalClose()
    }
    handleModalClose()
  }

  return(
    <CreateActivityProvider>
      <div className={styles.background}>

        <div className={styles.popup}>
          <div className={styles.title}>
            {
              type === 'category' ? (
                <span>Selecione uma categoria</span>
              ) : (
                <span>Selecione um arquivo</span>
              )
            }
            
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
    </CreateActivityProvider>
  )
}