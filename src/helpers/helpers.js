import constants from './constants';

/**
 * Combines all possible answers into a single array
 * @param  {Object} question  The data of the question (contains incorrect/correct answers, category, etc)
 */
const combineAllAnswers = question => {
  // Adds the correct answer to the incorrect_answers, just to
  let choices = question.incorrect_answers;
  choices.push(question.correct_answer);
  choices.map(choice => {
    return choice.trim();
  });

  const shuffledAnswers = decodeURIComponent(
    choices.sort((a, b) => 0.5 - Math.random())
  ).split(',');
  return shuffledAnswers;
};

/**
 * Capitalizes the first letter of any given word
 * @param  {String} word  The word to capitalize
 */
const capitalizeWord = word => {
  let firstLetter = word.charAt(0);
  let capitalFirstLetter = firstLetter.toUpperCase();
  return word.replace(firstLetter, capitalFirstLetter);
};

/**
 * Format quiz data
 * @param  {Object} question  The data of the question (contains incorrect/correct answers, category, etc)
 * @return  {Object} Formatted quiz data
 */
const formatAPIQuizData = question => {
  return {
    category: capitalizeWord(question.category),
    difficulty: question.difficulty,
    question: question.question.trim(),
    answers: combineAllAnswers(question),
    correct: decodeURIComponent(question.correct_answer.trim()),
  };
};

/**
 * Get a random category form the constants
 * @return  {ObjectKey} Object Key for the constant with the corresponding API URL
 */
const getCategory = () => {
  let keys = Object.keys(constants);
  let randomIndex = keys[Math.floor(Math.random() * keys.length)];
  let category = constants[randomIndex];
  return category;
};

export { formatAPIQuizData, getCategory };
