import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import Image from 'next/image'

import saveSVG from '../../../images/save.svg'
import trashSVG from '../../../images/trash.svg'

import { Category } from '../../../@types/Activity'
import { api } from '../../../services/api'
import styles from './styles.module.scss'
import { WarningDeleteModal } from '../../WarningDeleteModal'
import { AnimatePresence, motion } from 'framer-motion'

interface SelectedCategory{
  index?: number;
  category: Category;
}

interface CategoriesListProps{
  search: string;
  reload: boolean
}

export function CategoriesList({ search, reload }: CategoriesListProps){
  const [ isLoading, setIsLoading ] = useState(false)
  const [ newCategory, setNewCategory ] = useState<string>('')
  const [ categories, setCategories ] = useState<Category[]>([])
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ selectedCategory, setSeletedCategory ] = useState<SelectedCategory>({index: 0, category: {}} as SelectedCategory)

  useEffect(() => {
    (async function(){
      setIsLoading(true)
      const { data } = await api.get('/category/list')
      setCategories(data)
      setIsLoading(false)
    })()
  },[reload])

  async function createCategory(){
    const { data } = await api.post('category/new', { name: newCategory })

    setCategories(prevState => [...prevState, data])
    setNewCategory('')
  }
  async function deleteCategory(category_id: string, index: number){
    await api.delete(`category/delete/${category_id}`)
    categories.splice(index, 1)
    setCategories(categories)
    setIsModalVisible(false)
  }
  function handleCloseModal(){ setIsModalVisible(!isModalVisible) }
 

  return(
    <div className={`${styles.container} ${newCategory && styles.active}`}>
      <WarningDeleteModal
        closeModal={handleCloseModal}
        handleRemoveFromList={() => deleteCategory(selectedCategory.category.id, selectedCategory.index || 0)}
        name={selectedCategory.category.name}
        title="categoria"
        description="Ao excluir esta categoria, você estará excluindo todas
        as suas relações, como: atividades, perguntas, arquivos 
        relacionados, etc..."
        isVisible={isModalVisible}
      /> 
      
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
          {isLoading ? 
            <div className={styles.loading}>
              <Loading type='spin' width={52} height={52} color="#616BC5"/>
            </div> : 
          
          categories.filter(value => {
            if(search === ''){
              return value
            }else if(value.name.toLowerCase().includes(search.toLowerCase())){
                return value
            }
          }).map((item, index) => (
            <AnimatePresence exitBeforeEnter key={item.id}>
              <motion.div  
                className={styles.category_item} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
              >
                <div className={styles.image_category_item}>
                  <div></div>
                </div>
        
                <div className={styles.category_name}>
                  <span>{item.name}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setIsModalVisible(!isModalVisible);
                    setSeletedCategory({index, category: item})
                  }}
                >
                  <Image src={trashSVG} alt="Excluir categoria" />
                </button>
              </motion.div>
            </AnimatePresence>
          ))}
      </div>

    </div>
  )
}