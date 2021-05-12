const decodeHTML = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const formatChoices = (choices) => {
  return choices.map((choice) => {
    return decodeHTML(choice.trim());
  });
};
const combineAllChoices = (question) =>
  question.correct_answer.split(",").concat(question.incorrect_answers);

const formatAPIQuizData = (question) => {
  return {
    category: question.category,
    difficulty: question.difficulty,
    question: decodeHTML(question.question.trim()),
    answers: formatChoices(combineAllChoices(question)),
    correct: decodeHTML(question.correct_answer.trim()),
  };
};

export { formatAPIQuizData };
