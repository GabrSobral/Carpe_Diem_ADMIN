import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from 'react-loading'

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
import { Activity, FileProps } from '../../@types/Activity'
import { format } from 'date-fns'
import { usePage } from '../../hooks/usePage'
import { SelectModal } from '../SelectModal'

interface ArchiveSelected{
  file: FileProps;
  index: number
}

export function UpdateActivityContent(){
  const [ isCategoryModalOpen, setIsCategoryModalOpen ] = useState(false)
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState(false)

  const [ isLoading, setIsLoading ] = useState(false)
  const [ archiveSelected, setArchiveSelected ] = useState<ArchiveSelected>()
  const [ isDetailArchiveVisible, setIsDetailArchiveVisible ] = useState<boolean>(false)

  const { state, dispatch} = useActivity()
  const { handleSetPage } = usePage()
  const { newActivity, createActivityDispatch } = useCreateActivity()

  const created_at = Date.parse(String(state.activity?.created_at)) || new Date()
  const updated_at = Date.parse(String(state.activity?.created_at)) || new Date()
  const formattedCreatedAt = format(created_at, "dd/MM/yyyy 'às' HH:mm")
  const formattedUpdatedAt = format(updated_at, "dd/MM/yyyy 'às' HH:mm")

  useEffect(() => {
    createActivityDispatch({ type: 'clearInputs' })
    createActivityDispatch({ type: 'setActivity', payload: { data: state.activity || {} as Activity} })
  },[state.activity, createActivityDispatch])

  async function handleFetchCategories(){
    const { data } = await api.get('/category/list')
    return data
  }

  async function handleFetchArchives(){
    const { data } = await api.get('/archive/list')
    return data
  }

  function handleDetailArchive(archive: FileProps, index: number){
    setArchiveSelected({ file: archive, index })
    setIsDetailArchiveVisible(prev => !prev)
  }

  async function handleSumbit(event: FormEvent){
    event.preventDefault()
    if(!newActivity.title || !newActivity.subtitle || !newActivity.description){ return }

    setIsLoading(true)

    newActivity.title.trim()
    newActivity.subtitle.trim()
    newActivity. description.trim()

    const descriptionFormatted = newActivity.description.replace(/(?:\r\n|\r|\n)/g, '<hr>') 

    const newActivityData = await api.patch(`/activity/update/${state.activity?.id}`, {
      title: newActivity.title,
      description: newActivity.subtitle,
      body: descriptionFormatted,
      category:  newActivity.category?.id
    })

    await api.delete(`/archive-activity/delete/${state.activity?.id}`)

    newActivity.files.forEach(async (file) => {
      await api.post('/archive-activity/new', {
        activity: newActivityData.data.id,
        archive: file.id
      })
    })
    const updated_activity: Activity = {
      id: newActivityData.data.id,
      title: newActivityData.data.title,
      body: newActivityData.data.body,
      category: newActivityData.data.category,
      description: newActivityData.data.description,
      created_at: newActivityData.data.created_at,
      files: newActivity.files,
      updated_at: Date.now().toString(),
      index: state.activity?.index || 0
    }
    dispatch({ type: 'updateActivities', payload: { data: updated_activity, index: updated_activity.index}})
    dispatch({ type: 'select', payload: { data: updated_activity, index: updated_activity.index }})
    setIsLoading(false)
    handleSetPage('ActivityDetails')
    createActivityDispatch({ type: 'clearInputs' })
  }

  return(
    <AnimatePresence exitBeforeEnter>
    <div className={styles.container_updateActivityContent}>
      <HeaderContent title="Alterar Atividade"/>

      <motion.div 
        initial={{ opacity: 0, y: 50}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0}}
      >

        <SelectModal
          alreadyExists={[newActivity.category]}
          isVisible={isCategoryModalOpen}
          handleSelectData={
            (category) => createActivityDispatch({ type: 'setCategory', payload: { data: category } })}
          title="Selecione a categoria"
          handleModalClose={() => setIsCategoryModalOpen(false)}
          fetchFunction={handleFetchCategories}
        />

        <SelectModal 
          alreadyExists={newActivity.files}
          isVisible={isArchiveModalOpen}
          handleSelectData={(file) => createActivityDispatch({ type: 'setArchives', payload: { data: file }})}
          title="Selecione a categoria"
          handleModalClose={() => setIsArchiveModalOpen(false)}
          fetchFunction={handleFetchArchives}
        />

        <DetailArchiveModal 
          isVisible={isDetailArchiveVisible}
          handleCloseModal={() => setIsDetailArchiveVisible(false)}
          handleRemoveArchive={
            (index) => createActivityDispatch({ type: 'removeArchive', payload: { index } })}
          file={archiveSelected}
        />

      <main className={styles.main_updateActivityContent}>
        <span className={styles.created_at}>Criado em: {formattedUpdatedAt}</span>
        <span className={styles.created_at}>Atualizado em: {formattedCreatedAt}</span>
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

          <div className={`${styles.select_container} ${ newActivity.category && styles.active}`}>
            <span>Categoria:</span>
            <SelectButton 
              icon={newActivity.category?.name || "Category"}
              isActive={newActivity.category ? true : false} 
              title={newActivity.category?.name || 'Selecione'} 
              onClick={() => setIsCategoryModalOpen(true)}
            />
          </div>

          <div className={`${styles.select_container} ${ newActivity.files.length !== 0  && styles.active}`}>
            <span>Arquivos:</span>

            <div className={styles.archives_list}>
              {
                newActivity.files.map((item, index) => (
                  <SelectButton 
                    icon={item.format}
                    key={item.id}
                    isActive={newActivity.files ? true : false} 
                    title={item.name || ''}
                    onClick={() => {handleDetailArchive(item, index); }}
                  />
                ))
              }

              <button 
                type="button" 
                className={styles.add_file} 
                onClick={() => setIsArchiveModalOpen(true)}>
                <Image src={plusSVG} alt="Icone de adicionar"/>
              </button>

            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submit_button}
            disabled={isLoading || !(
              newActivity.title && 
              newActivity.subtitle && 
              newActivity. description && 
              newActivity.category
            )}
          >
            {
              isLoading ? (
                <Loading type="spin" width={32} height={32} color="#fff"/>
              ) : (
                <>
                  <Image src={saveSVG} alt="Icone de salvar"/>
                  Salvar
                </>
              )
            }
           
          </button>
        </form>
      </main>
      </motion.div>
    </div>
    </AnimatePresence>
  )
}