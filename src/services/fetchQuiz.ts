import React from "react";
import { QuizType, QuestionType } from "../Types/quiz_types";
const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export default async function fetchQuixes(
  totalQuestions: number,
  level: string
): Promise<QuizType[]> {
  try {
    let res: Response = await fetch(
      `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`
    );
    let { results }: any = await res.json();
    let data: QuizType[] = results.map(
      (questionObj: QuestionType, index: number) => {
        return {
          question: questionObj.question,
          answer: questionObj.correct_answer,
          correct_answer: questionObj.correct_answer,
          option: shuffleArray(
            questionObj.incorrect_answers.concat(questionObj.correct_answer)
          ).map((item : string , index : number)  =>{
            return {
              mcqs : item,
              selected : false
            }

          })
        };
      }
    );
   
    return data;
  } catch (e) {
    return e;
  }
}
