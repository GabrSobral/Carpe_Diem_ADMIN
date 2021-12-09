import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from 'react-loading'
import { motion } from 'framer-motion'

import saveSVG from '../../images/save.svg'
import plusSVG from '../../images/plus.svg'

import { HeaderContent } from '../HeaderContent'
import { InputCreate } from '../InputCreate'
import { SelectButton } from '../SelectButton'
import { DetailArchiveModal } from '../DetailArchiveModal'

import { api } from '../../services/api'

import styles from './styles.module.scss'
import { useCreateActivity } from '../../hooks/useCreateActivity'
import { useActivity } from '../../hooks/useActivity'

import { FileProps } from '../../@types/Activity'
import { SelectModal } from '../SelectModal'
import { usePage } from '../../hooks/usePage'

interface ArchiveSelected{
  file: FileProps;
  index: number
}

export function CreateActivityContent(){
  const [ isCategoryModalOpen, setIsCategoryModalOpen ] = useState(false)
  const [ isArchiveyModalOpen, setIsArchiveModalOpen ] = useState(false)

  const [ isLoading, setIsLoading ] = useState(false)
  const [ isDetailArchiveVisible, setIsDetailArchiveVisible ] = useState<boolean>(false)
  const [ archiveSelected, setArchiveSelected ] = useState<ArchiveSelected>()
  const { handleSetPage } = usePage()
  const { state, dispatch } = useActivity()
  const { newActivity, createActivityDispatch } = useCreateActivity()

  useEffect(() => {
    createActivityDispatch({ type: 'clearInputs' })
  },[createActivityDispatch])

  function handleDetailArchive(archive: FileProps, index: number){
    setArchiveSelected({ file: archive, index })
    setIsDetailArchiveVisible(prev => !prev)
  }

  async function handleFetchCategories(){
    const { data } = await api.get('/category/list')
    return data
  }

  async function handleFetchArchives(){
    const { data } = await api.get('/archive/list')
    return data
  }

  async function handleSumbit(event: FormEvent){
    event.preventDefault()
    setIsLoading(true)

    newActivity?.title.trim()
    newActivity?.subtitle.trim()
    newActivity?.description.trim()

    const descriptionFormatted = newActivity?.description.replace(/(?:\r\n|\r|\n)/g,'<hr/>')

    const newActivityData = await api.post('/activity/new', {
      title: newActivity?.title,
      description: newActivity?.description,
      body: descriptionFormatted,
      category: newActivity?.category?.id
    })

    newActivity?.files.forEach(async (file) => {
      await api.post('/archive-activity/new', {
        activity: newActivityData.data.id,
        archive: file.id
      })
    })

    const activityOne = await api.get(`/activity/show/${newActivityData.data.id}`)
    activityOne.data.feedback = newActivityData.data.feedback

    setIsLoading(false)
    createActivityDispatch({ type: 'clearInputs' })
    dispatch({ type: "addActivity", payload: { data: activityOne.data } })
    dispatch({ type: "select", payload: { data: activityOne.data, index: state.activities.length } })
    
    handleSetPage("ActivityDetails")
  }
  
  return(
    <div className={styles.container_CreateActivitContent}>
      <HeaderContent title="Criar Atividade"/>
      <motion.div
        key="CreateAtivityContent"
        initial={{ opacity: 0, y: 50}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0}}
      >
        <SelectModal 
          isVisible={isCategoryModalOpen}
          handleSelectData={
            (category) => createActivityDispatch({ type: 'setCategory', payload: { data: category } })}
          title="Selecione a categoria"
          handleModalClose={() => setIsCategoryModalOpen(false)}
          fetchFunction={handleFetchCategories}
          alreadyExists={[newActivity?.category]}
        /> 

        <SelectModal 
          isVisible={isArchiveyModalOpen}
          handleSelectData={
            (file) => createActivityDispatch({ type: 'setArchives', payload: { data: file } })}
          title="Selecione um arquivo"
          handleModalClose={() => setIsArchiveModalOpen(false)}
          fetchFunction={handleFetchArchives}
          alreadyExists={newActivity?.files || []}
        />
        
        <DetailArchiveModal
          isVisible={isDetailArchiveVisible}
          handleCloseModal={() => setIsDetailArchiveVisible(false)}
          handleRemoveArchive={
            (index) => createActivityDispatch({ type: 'removeArchive', payload: { index } })}
          file={archiveSelected}
        />

        <main className={styles.CreateActivityContent_main}>
          <form onSubmit={handleSumbit}>
            <InputCreate 
              title="Título:" 
              type="text" 
              setValue={(value) => createActivityDispatch({ type: 'setTitle', payload: { data: value } })} 
              value={newActivity?.title || ''}
            />

            <InputCreate 
              title="Subtítulo:" 
              type="text" 
              setValue={(value) => createActivityDispatch({ type: 'setSubTitle', payload: { data: value } })} 
              value={newActivity?.subtitle || ''}
            />

            <InputCreate 
              title="Descrição:" 
              type="textarea" 
              setValue={(value) => createActivityDispatch({ type: 'setDescription', payload: { data: value } })} 
              value={newActivity?.description || ''}
            />

            <div className={`${styles.select_container} ${ newActivity?.category && styles.active}`}>
              <span>Categoria:</span>
              <SelectButton 
                icon={newActivity.category?.name || "Category"}
                isActive={newActivity.category ? true : false} 
                title={newActivity.category?.name || 'Selecione'} 
                onClick={() => setIsCategoryModalOpen(true) }
              />
            </div>

            <div className={
              `${styles.select_container} ${ newActivity?.files.length !== 0  && styles.active}`}>
              <span>Arquivos:</span>
              <div className={styles.archives_list}>
                {
                  newActivity?.files.map((item, index) => (
                    <SelectButton
                      icon={item.format}
                      key={item.id}
                      isActive={newActivity?.files ? true : false} 
                      title={item.name || ''}
                      onClick={() => {handleDetailArchive(item, index); }}
                    />
                  ))
                }
                <button 
                  type="button" 
                  className={styles.add_file} 
                  onClick={() =>  setIsArchiveModalOpen(true)}
                >
                  <Image src={plusSVG} alt="Icone de adicionar"/>
                </button>

              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submit_button}
              disabled={
                isLoading || !(
                  newActivity.title && 
                  newActivity.subtitle && 
                  newActivity. description && 
                  newActivity.category
                )
              }
            >
              {
                isLoading ? 
                  <Loading type="spin" width={32} height={32} color="#fff"/>
                : 
                <>
                  <Image src={saveSVG} alt="Icone de salvar"/>
                  Salvar
                </>
              }
            </button>
          </form>
        </main>
      </motion.div>
    </div>
  )
}