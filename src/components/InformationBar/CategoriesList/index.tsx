import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import Image from 'next/image'

import saveSVG from '../../../images/save.svg'
import trashSVG from '../../../images/trash.svg'
import deleteSVG from '../../../images/delete.svg'
import xSVG from '../../../images/x.svg'
import checkSVG from '../../../images/check.svg'

import { Category } from '../../../@types/Activity'
import { api } from '../../../services/api'
import styles from './styles.module.scss'

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
  function DeleteCategoryModal(){
    const [ isLoading, setIsLoading ] = useState(false)

    const id = selectedCategory.category.id;
    const index = selectedCategory.index
    return(
      <div className={styles.Modalbackground}>
        <div className={styles.modal_popup}>
          <Image 
            src={deleteSVG} 
            alt="Imagem de lixeira"
            height={256}
          />
          <h2>
            Você tem certeza de que quer excluir a 
            categoria: <span>{selectedCategory.category.name}</span>?
          </h2>

          <span>Ao excluir esta categoria, você estará excluindo todas
            as suas relações, como: atividades, perguntas, arquivos 
            relacionados, etc... <strong>Você quer prosseguir?</strong>
          </span>
          <div className={styles.button_container_modal}>
            <button 
              type="button" 
              onClick={() => {
                deleteCategory(id, index || 0);
                setIsLoading(true)
              }}
            >
              {
                isLoading ? <Loading type="spin" color="#fff" height={24} width={24}/>
                : (
                  <>
                    <Image 
                      src={checkSVG} 
                      alt="Imagem de confirmação"
                    />
                    Sim
                  </>
                )
              }
              
              
            </button>
            <button type="button" onClick={() => setIsModalVisible(!isModalVisible)}>
              <Image 
                src={xSVG} 
                alt="Imagem de deleção"
              />
              Não
            </button>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className={`${styles.container} ${newCategory && styles.active}`}>
      { isModalVisible && <DeleteCategoryModal/> }
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
            <div  className={styles.category_item} key={item.id}>
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
            </div>
          ))}
      </div>

    </div>
  )
}