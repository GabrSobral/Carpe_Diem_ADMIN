import { useEffect, useState } from "react";
import Loading from "react-loading";

import styles from '../styles.module.scss'

import { useActivity } from "../../../hooks/useActivity";
import { usePage } from "../../../hooks/usePage";

import { api } from "../../../services/api";
import { ActivityItem } from "../../ActivityItem";
import { AnimatePresence, motion } from "framer-motion";

interface ActivitiesListProps{
  search: string;
  handleSetSearch: (value: string) => void;
  reload: boolean
}

export function ActivitiesList(
  {search, handleSetSearch, reload}: ActivitiesListProps){
  const { activities, handleSelectActivity, handleSetActivities } = useActivity()
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleSetPage } = usePage()

  useEffect(() => {
    (async function(){
      setIsLoading(true)
      await api.get('/activity/list?cmd=count').then(({ data }) => {
      handleSetActivities(data)
      setIsLoading(false)
    })
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reload])

  return(
    <>
     {
      isLoading ? 
        <div className={styles.loading}>
          <Loading type='spin' width={52} height={52} color="#616BC5"/>
        </div>

      :
      activities?.filter(value => {
        if(search === ''){
          return value
        }else if(value.title.toLowerCase().includes(search.toLowerCase())){
            return value
        }
      }).map((item, index) => (
        <AnimatePresence exitBeforeEnter key={item.id}>
          <ActivityItem 
            id={item.id}
            title={item.title}
            description={item.description}
            body={item.body}
            category={item.category.name}
            onClick={() => {
              handleSelectActivity(item, index); 
              handleSetSearch('');
              handleSetPage("ActivityDetails")
            }}
          />
        </AnimatePresence>
        ))
     }
    </>
  )
}