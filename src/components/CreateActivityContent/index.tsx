import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from 'react-loading'
import { AnimatePresence, motion } from 'framer-motion'

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

interface ArchiveSelected{
  file: FileProps;
  index: number
}

export function CreateActivityContent(){
  const [ isCategoryModalOpen, setIsCategoryModalOpen ] = useState(false)
  const [ isArchiveyModalOpen, setIsArchiveModalOpen ] = useState(false)

  const [ isFilled, setIsFilled ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleAddActivity } = useActivity()
  const [ isDetailArchiveVisible, setIsDetailArchiveVisible ] = useState<boolean>(false)
  const [ archiveSelected, setArchiveSelected ] = useState<ArchiveSelected>()
  const { handleSetCategory, handleSetArchive } = useCreateActivity()
  const { 
    category,
    archives,
    title,
    description,
    handleSetDescription,
    handleSetSubTitle,
    handleClearInputs,
    handleSetTitle,
    subTitle,
    handleRemoveArchive
  } = useCreateActivity()

  useEffect(() => {
    title && subTitle && description && category ? setIsFilled(true) : setIsFilled(false)
  },[ title, subTitle, description, category ])

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

    title.trim()
    subTitle.trim()
    description.trim()

    function breakLines(string: string){
      return string.replace(/(?:\r\n|\r|\n)/g, '<hr>');
    }

    const descriptionFormatted = breakLines(description) 

    const newActivity = await api.post('/activity/new', {
      title,
      description: subTitle,
      body: descriptionFormatted,
      category: category?.id
    })

    archives.forEach(async (file) => {
      await api.post('/archive-activity/new', {
        activity: newActivity.data.id,
        archive: file.id
      })
    })

    const { data } = await api.get(`/activity/show/${newActivity.data.id}`)
    setIsLoading(false)
    handleClearInputs()
    handleAddActivity(data)
  }

  return(
    <div className={styles.container}>
      <HeaderContent title="Criar Atividade"/>
      <motion.div
        key="CreateAtivityContent"
        initial={{ opacity: 0, y: 50}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0}}
      >
        <SelectModal 
          isVisible={isCategoryModalOpen}
          handleSelectData={handleSetCategory}
          title="Selecione a categoria"
          handleModalClose={() => setIsCategoryModalOpen(false)}
          fetchFunction={handleFetchCategories}
        /> 

        <SelectModal 
          isVisible={isArchiveyModalOpen}
          handleSelectData={handleSetArchive}
          title="Selecione um arquivo"
          handleModalClose={() => setIsArchiveModalOpen(false)}
          fetchFunction={handleFetchArchives}
        />
        
        <DetailArchiveModal
          isVisible={isDetailArchiveVisible}
          handleCloseModal={() => setIsDetailArchiveVisible(false)}
          handleRemoveArchive={handleRemoveArchive}
          file={archiveSelected}
        />


        <main>
          <form onSubmit={handleSumbit}>
            <InputCreate title="Título:" type="text" setValue={handleSetTitle} value={title}/>
            <InputCreate title="Subtítulo:" type="text" setValue={handleSetSubTitle} value={subTitle}/>
            <InputCreate title="Descrição:" type="textarea" setValue={handleSetDescription} value={description}/>

            <div className={`${styles.select_container} ${ category && styles.active}`}>
              <span>Categoria:</span>
              <SelectButton 
                isActive={category ? true : false} 
                title={category?.name || 'Selecione'} 
                onClick={() => setIsCategoryModalOpen(true) }
              />
            </div>

            <div className={`${styles.select_container} ${ archives.length !== 0  && styles.active}`}>
              <span>Arquivos:</span>
              <div className={styles.archives_list}>
                {
                  archives.map((item, index) => (
                    <SelectButton 
                      key={item.id}
                      isActive={archives ? true : false} 
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
              disabled={isLoading || !isFilled}
            >
              {
                isLoading ? <Loading type="spin" width={32} height={32} color="#fff"/>
                : (<>
                    <Image src={saveSVG} alt="Icone de salvar"/>
                    Salvar
                  </>)
              }
            </button>
          </form>
        </main>
        </motion.div>
    </div>
  )
}