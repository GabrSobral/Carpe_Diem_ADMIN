import { useState } from "react";
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'

import { Question } from "../../@types/Activity";
import plusSVG from '../../images/plus.svg'

import { HeaderContent } from "../HeaderContent";
import { QuestionItem } from "../QuestionItem";

import styles from "./styles.module.scss" 
import { CreateQuestionInput } from "../CreateQuestionInput";
import { WarningDeleteModal } from "../WarningDeleteModal";
import { useAnswersAndCategories } from "../../hooks/useAnswersAndCategories";

export function AnswersAndCategoriesContent(){
	const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
	const [ selectedQuestion, setSelectedQuestion ] = useState<Question>()
	const [ createQuestionIsVisible, setCreateQuestionIsVisible ] = useState(false)
	const { questions, questionDispatch } = useAnswersAndCategories()

	async function deleteQuestion(id: string){
		questionDispatch({ type: 'deleteQuestion', payload: { id } })
		setIsModalVisible(!isModalVisible)
	}

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
					closeModal={() => setIsModalVisible(!isModalVisible)}
					handleRemoveFromList={() => deleteQuestion(selectedQuestion?.id ||'')}
					name={selectedQuestion?.body || ''}
					title="a pergunta"
					description="Ao excluir esta pergunta, você estará excluindo todas
					as suas relações, como: atividades, respostas, arquivos 
					relacionados, etc..."
					isVisible={isModalVisible}
				/> 

				<CreateQuestionInput 
					isVisible={createQuestionIsVisible}
					handleAddQuestionToList={(data) => questionDispatch({ type: 'addQuestion', payload: { data }})}
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