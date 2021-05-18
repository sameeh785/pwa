import React, { useEffect, useState } from "react";
import quix from "../../services/fetchQuiz";
import { QuizType, Mcqs } from "../../Types/quiz_types";
import style from "./style.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import cx from "classnames";

const useStyles = makeStyles({});



export default function Start() {
  let [questions, setQuestions] = useState<QuizType[]>([]);
  let [answere, setAnswere] = useState<string[]>([]);
  let [result, showResult] = useState<boolean>(false);
  let [total, setMarks] = useState<number>(0);
  let [property, setProperty] = useState<boolean>(false);

  useEffect((): void => {
    async function fetchQuiz() {
      try {
        let data: QuizType[] = await quix(10, "easy");
        if(data[0]){
        localStorage.setItem("sami", JSON.stringify(data));
        setQuestions(data)
      }
        else{
          throw new Error('Exception message');
        }
      ;
      } catch (e) {
        const localData=localStorage.getItem("sami");
        const data1 = localData as string
        setQuestions(JSON.parse(data1))
        
      }
    }
    fetchQuiz();
  }, []);
  function showData(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    console.log(answere);
    let marks: number = 0;
    for (let i = 0; i < questions.length; i++) {
      console.log("sami");
      if (questions[i].correct_answer === answere[i]) {
        marks = marks + 1;
        console.log(marks);
        setMarks(marks);
      }
    }
    showResult(true);
  }
  return (
    <div className={style.mainDiv}>
      {questions.length === 0 ? (
        <h1></h1>
      ) : result ? (
        <div className={style.result}>
          <Card className={style.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Result
              </Typography>
              <Typography className={style.pos} color="textSecondary">
                Your got {total} marks out of {questions.length}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <form onSubmit={showData}>
          {questions.map(
            (items: QuizType, index1: number): JSX.Element => {
              return (
                <div className={style.center}>
                  <span className={style.counter}> {index1 + 1})</span>{" "}
                  <h5 className={style.heading}>{items.question}</h5>
                  {items.option.map((item1: Mcqs, index: number) => {
                    return (
                      <div>
                        <label
                          className={
                            item1.selected
                              ? cx(style.radioBtn, style.border, style.setColor)
                              : cx(style.radioBtn, style.border)
                          }
                        >
                          <input
                            name={index1 + ""}
                            type="radio"
                            required={true}
                            value={item1.mcqs}
                            onChange={(e) => {
                              for (
                                let i: number = 0;
                                i < items.option.length;
                                i++
                              ) {
                                items.option[i].selected = false;
                              }
                              item1.selected = true;
                              setQuestions([...questions])
                              console.log(questions);
                              answere[index1] = e.target.value;
                              setAnswere([...answere]);
                            }}
                          />
                          {item1.mcqs}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            }
          )}
          <input type="submit" value="submit" className={style.btn} />
        </form>
      )}
    </div>
  );
}
