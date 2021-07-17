import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from 'react-loading'

import saveSVG from '../../images/save.svg'
import plusSVG from '../../images/plus.svg'

import { HeaderContent } from '../HeaderContent'
import { InputCreate } from '../InputCreate'
import { SelectButton } from '../SelectButton'
import { DetailArchiveModal } from '../DetailArchiveModal'

import { useModal } from '../../hooks/useModal'
import { api } from '../../services/api'

import styles from './styles.module.scss'
import { useCreateActivity } from '../../hooks/useCreateActivity'
import { useActivity } from '../../hooks/useActivity'

import { FileProps } from '../../@types/Activity'

interface ArchiveSelected{
  file: FileProps;
  index: number
}

export function CreateActivityContent(){
  const [ isFilled, setIsFilled ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleAddActivity } = useActivity()
  const [ isDetailArchiveVisible, setIsDetailArchiveVisible ] = useState<boolean>(false)
  const [ archiveSelected, setArchiveSelected ] = useState<ArchiveSelected>()
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
  const { handleModalCategory, handleModalArchives } = useModal()

  useEffect(() => {
    title && subTitle && description && category ? setIsFilled(true) : setIsFilled(false)
  },[ title, subTitle, description, category ])

  function handleDetailArchive(archive: FileProps, index: number){
    setArchiveSelected({ file: archive, index })
    setIsDetailArchiveVisible(!isDetailArchiveVisible)
  }
  function handleCloseModal(){ setIsDetailArchiveVisible(!isDetailArchiveVisible) }

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

      { isDetailArchiveVisible && (
        <DetailArchiveModal 
          handleCloseModal={handleCloseModal}
          handleRemoveArchive={handleRemoveArchive}
          file={archiveSelected}
        />
      ) }

        <main>
          <form onSubmit={handleSumbit}>
            <InputCreate title="Título:" type="text" setValue={handleSetTitle} value={title}/>
            <InputCreate title="Subtítulo:" type="text" setValue={handleSetSubTitle} value={subTitle}/>
            <InputCreate title="Descrição:" type="textarea" setValue={handleSetDescription} value={description}/>

            <div className={`${styles.select_container} ${ category && styles.active}`}>
              <span>Categoria:</span>
              <SelectButton isActive={category ? true : false} title={category?.name || 'Selecione'} onClick={handleModalCategory}/>
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
                <button type="button" className={styles.add_file} onClick={handleModalArchives}>
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
    </div>
  )
}