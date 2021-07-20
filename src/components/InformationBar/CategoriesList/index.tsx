import { useEffect, useState } from 'react'
import Image from 'next/image'
import saveSVG from '../../../images/save.svg'
import styles from './styles.module.scss'
import { Category } from '../../../@types/Activity'
import { api } from '../../../services/api'

export function CategoriesList(){
  const [ newCategory, setNewCategory ] = useState<string>('')
  const [ categories, setCategories ] = useState<Category[]>([])

  useEffect(() => {
    (async function(){
      const { data } = await api.get('/category/list')
      setCategories(data)
    })()
  },[])

  async function createCategory(){
    const { data } = await api.post('category/new', { name: newCategory })

    setCategories(prevState => [...prevState, data])
    setNewCategory('')
  }

  return(
    <div className={`${styles.container} ${newCategory && styles.active}`}>

      <div className={styles.input_container}>
        <span>Digite a categoria</span>
        <input 
          type="text" 
          value={newCategory} 
          onChange={event => setNewCategory(event.target.value)}
        />
        <button type="button" disabled={!newCategory} onClick={createCategory}>
          <Image src={saveSVG} alt="Criar categoria"/>
          Criar
        </button>
      </div>

      <div className={styles.categories_list}>
          {categories.map(item => (
            <div  className={styles.category_item} key={item.id}>
              <div className={styles.image_category_item}>
                <div></div>
              </div>
      
              <div className={styles.category_name}>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
      </div>

    </div>
  )
}