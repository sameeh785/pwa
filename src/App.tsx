import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Start from "./components/start/start";
import DisplayQuiz from "./components/quix/displayQuiz";
import firebase from './firebase'
import "./App.css";
import quix from "../src/services/fetchQuiz";
import {QuizType} from '../src/Types/quiz_types'


export default function App(): JSX.Element {
 

  useEffect(() => {
    const msg = firebase.messaging();
    // [START messaging_request_permission]
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        msg.getToken().then((token) => {
          if (token) {
            console.log(token)
          }
          else {
             console.log('No registration token available. Request permission to generate one.')
          }
        }).catch(e => {
          console.log(e)
        })

      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    async function sami(){
    let data: QuizType[] = await quix(10, "easy");
    if(data[0]){
      localStorage.setItem("sami", JSON.stringify(data));
    }
  }
  sami()

  }, [])
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Start} />
        <Route path="/start" render={() => {
          return <DisplayQuiz />
        }} />
      </BrowserRouter>
    </>
  );
}
