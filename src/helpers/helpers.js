import constants from './constants';

const decodeHTML = html => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const formatChoices = choices => {
  return choices.map(choice => {
    return decodeHTML(choice.trim());
  });
};
const combineAllAnswers = question =>
  question.correct_answer.split(',').concat(question.incorrect_answers);

const capitalizeWord = word => {
  let firstLetter = word.charAt(0);
  let capitalFirstLetter = firstLetter.toUpperCase();
  return word.replace(firstLetter, capitalFirstLetter);
};

const formatAPIQuizData = question => {
  return {
    category: capitalizeWord(question.category),
    difficulty: question.difficulty,
    question: decodeHTML(question.question.trim()),
    answers: formatChoices(combineAllAnswers(question)),
    correct: decodeHTML(question.correct_answer.trim()),
  };
};

const getCategory = () => {
  let keys = Object.keys(constants);
  let randomIndex = keys[Math.floor(Math.random() * keys.length)];
  let category = constants[randomIndex];
  return category;
};

export { formatAPIQuizData, getCategory };
