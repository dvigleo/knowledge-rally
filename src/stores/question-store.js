import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import requests from '../api/requests';
import { formatAPIQuizData, getCategory } from '../helpers/helpers';

class QuestionStore {
  constructor() {
    makeAutoObservable(this);
  }

  question = {};

  getQuestion = async () => {
    try {
      let question = await requests.getQuestion(getCategory());
      let formattedQuestion = formatAPIQuizData(question.results[0]);
      console.log(formattedQuestion.answers.length);
      if (formattedQuestion.answers.length > 4) {
        console.log('repeat');
        question = await requests.getQuestion(getCategory());
        formattedQuestion = formatAPIQuizData(question.results[0]);
      }
      this.question = formattedQuestion;
    } catch (err) {
      console.log('There was a problem getting the question ', err);
    }
  };
}

export default createContext(new QuestionStore());
