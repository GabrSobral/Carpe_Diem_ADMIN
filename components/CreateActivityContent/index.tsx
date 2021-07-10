import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'

import saveSVG from '../../images/save.svg'
import plusSVG from '../../images/plus.svg'

import { HeaderContent } from '../HeaderContent'
import { InputCreate } from '../InputCreate'

import styles from './styles.module.scss'
import { SelectButton } from '../SelectButton'
import { useModal } from '../../hooks/useModal'

export function CreateActivityContent(){
  const [ title, setTitle ] = useState<string>('')
  const [ subTitle, setSubTitle ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')

  const { handleModalCategory, handleModalArchives } = useModal()

  const active = true
  
  function handleSetTitle(value: string){ setTitle(value) }
  function handleSetSubTitle(value: string){ setSubTitle(value) }
  function handleSetDescription(value: string){ setDescription(value) }

  function handleSumbit(event: FormEvent){
    event.preventDefault()
  }

  return(
    <div className={styles.container}>
      <HeaderContent title="Criar Atividade"/>

      <main>
        {/* <span className={styles.created_at}>Criado em: 08/07/2021 ás 15: 32</span> */}
        <form onSubmit={handleSumbit}>
          <InputCreate title="Título:" type="text" setValue={handleSetTitle} value={title}/>
          <InputCreate title="Subtítulo:" type="text" setValue={handleSetSubTitle} value={subTitle}/>
          <InputCreate title="Descrição:" type="textarea" setValue={handleSetDescription} value={description}/>

          <div className={`${styles.select_container} ${ active  && styles.active}`}>
            <span>Categoria:</span>
            <SelectButton isActive={active} title="Música" onClick={handleModalCategory}/>
          </div>

          <div className={`${styles.select_container} ${ active  && styles.active}`}>
            <span>Arquivos:</span>

            <div className={styles.archives_list}>
              <SelectButton isActive={active} title="Video_sobre_exercicios.mp4"/>
              <SelectButton isActive={active} title="Musica_relaxante.mp3"/>

              <button type="button" className={styles.add_file} onClick={handleModalArchives}>
                <Image src={plusSVG} alt="Icone de adicionar"/>
              </button>

            </div>
          </div>

          <button type="submit" className={styles.submit_button}>
            <Image src={saveSVG} alt="Icone de salvar"/>
            Salvar
          </button>
        </form>
      </main>
    </div>
  )
}