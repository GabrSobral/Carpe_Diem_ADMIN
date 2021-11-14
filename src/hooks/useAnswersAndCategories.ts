import { useContext } from "react";
import { AnswersAndCategoriesContext } from "../contexts/AnswersAndCategoriesContext";

export function useAnswersAndCategories(){
  return useContext(AnswersAndCategoriesContext)
}