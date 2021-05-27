import constants from './constants';

const combineAllAnswers = question => {
  console.log(question.correct_answer);
  console.log(question.incorrect_answers);
  question.incorrect_answers.push(question.correct_answer);
  question.incorrect_answers.map(choice => {
    console.log(choice);
    return choice.trim();
  });
  const shuffledAnswers = decodeURIComponent(
    question.incorrect_answers.sort((a, b) => 0.5 - Math.random())
  ).split(',');
  console.log(shuffledAnswers);
  return shuffledAnswers;
};

const capitalizeWord = word => {
  let firstLetter = word.charAt(0);
  let capitalFirstLetter = firstLetter.toUpperCase();
  return word.replace(firstLetter, capitalFirstLetter);
};

const formatAPIQuizData = question => {
  return {
    category: capitalizeWord(question.category),
    difficulty: question.difficulty,
    question: question.question.trim(),
    answers: combineAllAnswers(question),
    correct: decodeURIComponent(question.correct_answer.trim()),
  };
};

const getCategory = () => {
  let keys = Object.keys(constants);
  let randomIndex = keys[Math.floor(Math.random() * keys.length)];
  let category = constants[randomIndex];
  return category;
};

export { formatAPIQuizData, getCategory };
