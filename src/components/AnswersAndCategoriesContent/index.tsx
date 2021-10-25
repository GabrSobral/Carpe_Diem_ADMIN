import { useEffect, useState } from "react";
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'

import { Question } from "../../@types/Activity";
import { api } from "../../services/api";
import plusSVG from '../../images/plus.svg'

import { HeaderContent } from "../HeaderContent";
import { QuestionItem } from "../QuestionItem";

import styles from "./styles.module.scss" 
import { CreateQuestionInput } from "../CreateQuestionInput";
import { WarningDeleteModal } from "../WarningDeleteModal";

export function AnswersAndCategoriesContent(){
	const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
	const [ questions, setQuestions ] = useState<Question[]>([])
	const [ selectedQuestion, setSelectedQuestion ] = useState<Question>()
	const [ createQuestionIsVisible, setCreateQuestionIsVisible ] = useState(false)

	useEffect(() => {
		(async function(){
			await api.get('/question/list').then(({data}) => { setQuestions(data) })
		})()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	function handleUpdateQuestionState(id: string){
		(async function(){
			await api.delete(`/question/delete/${id}`)
		})()
		const newList = questions.filter((item) => item.id !== id);

		setQuestions(newList)
		setIsModalVisible(!isModalVisible)
	}
	function handleAddQuestionToList(question: Question){
		setQuestions(prevState => [...prevState, question])
	}
	function handleCloseModal(){ setIsModalVisible(!isModalVisible) }

	function handleSetSelectedQuestionAndOpenModal(question: Question){ 
		setSelectedQuestion(question)
		setIsModalVisible(!isModalVisible)
	}

	return(
		<div className={styles.containerAnswerAndCategories}>
			<HeaderContent title="Categorias e perguntas"/>
				<button type='button' onClick={() => setCreateQuestionIsVisible(!createQuestionIsVisible)}>
					Criar Pergunta
					<Image src={plusSVG} alt="Icone de adicionar"/>
				</button>

				<WarningDeleteModal
					closeModal={handleCloseModal}
					handleRemoveFromList={() => handleUpdateQuestionState(selectedQuestion?.id ||'')}
					name={selectedQuestion?.body || ''}
					title="pergunta"
					description="Ao excluir esta pergunta, você estará excluindo todas
					as suas relações, como: atividades, respostas, arquivos 
					relacionados, etc..."
					isVisible={isModalVisible}
				/> 

				<CreateQuestionInput 
					handleAddQuestionToList={handleAddQuestionToList}
					isVisible={createQuestionIsVisible}
				/>

				<main className={styles.main_content}>
					{questions.map((item) => (
						<AnimatePresence exitBeforeEnter key={item.id}>
							<QuestionItem 
								question={item}
								handleSelect={handleSetSelectedQuestionAndOpenModal}
							/>
						</AnimatePresence>
					))}
				</main>
		</div>
	)
}