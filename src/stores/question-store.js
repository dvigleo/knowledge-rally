import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import requests from '../api/requests';
import { formatAPIQuizData, getCategory } from '../helpers/helpers';

class QuestionStore {
  constructor() {
    makeAutoObservable(this);
  }

  question = {};

  /**
   * Get a question from the Open Trivia API.
   */
  getQuestion = async () => {
    try {
      // A random category is obtained, and the question is formatted accordingly
      let question = await requests.getQuestion(getCategory());
      let formattedQuestion = formatAPIQuizData(question.results[0]);
      // If the answers is > 4, fetch another question from the API
      if (formattedQuestion.answers.length > 4) {
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
