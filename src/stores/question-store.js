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
      const question = await requests.getQuestion(getCategory());
      const formattedQuestion = formatAPIQuizData(question.results[0]);
      this.question = formattedQuestion;
    } catch (err) {
      console.log('There was a problem getting the question ', err);
    }
  };
}

export default createContext(new QuestionStore());
