import axios from "axios";

const getQuestionsFromAPI = async () => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=multiple"
    );
    return response.data.results;
  } catch (err) {
    console.log(err);
  }
};

const decodeHTML = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const formatChoices = (choices) => {
  return choices.map((choice, index) => {
    return decodeHTML(choice.trim());
  });
};
const combineAllChoices = (question) =>
  question.correct_answer.split(",").concat(question.incorrect_answers);

const formatQuestion = (question, index) => {
  return {
    id: index,
    category: question.category,
    difficulty: question.difficulty,
    question: decodeHTML(question.question.trim()),
    answers: formatChoices(combineAllChoices(question)),
    correct: decodeHTML(question.correct_answer.trim()),
  };
};

const formatAPIQuizData = (questions) => {
  return questions.map((question, index) => {
    return formatQuestion(question, index);
  });
};

const trivia = async () => {
  try {
    const questions = await getQuestionsFromAPI();
    const formattedQuestions = await formatAPIQuizData(questions);
    return formattedQuestions;
  } catch (err) {
    console.log(err);
  }
};

export { trivia };
