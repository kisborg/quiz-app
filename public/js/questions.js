const questionContainer = document.getElementById('manage-questions');
const form = document.getElementById('new-question');

form.addEventListener('click', (event) => {
  if (event.target.id === 'submit') {
    event.preventDefault();
    const question = document.getElementById('question-input').value;
    const answers = [];
    document.querySelectorAll('.answers')
      .forEach((answer) => {
        answers.push(answer.value);
      });
    const isCorrect = [];
    document.querySelectorAll(`input[type='radio']`).forEach((answer) => {
      if (answer.checked) {
        isCorrect.push(1);
      } else {
        isCorrect.push(0);
      }
    });
    const newQuestion = {
      question: question,
      answers: [],
    };
    for (let i = 0; i < 4; i++) {
      newQuestion.answers.push({ answer: answers[i], is_correct: isCorrect[i] });
    }
    fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(result => getQuestions())
      .catch(console.log);
  }
});

questionContainer.addEventListener('click', (event) => {
  console.log(event.target.dataset.id);
  if (event.target.className === 'delete') {
    const { id } = event.target.dataset;
    fetch('/api/questions/' + id, { method: 'DELETE' })
      .then(result => getQuestions())
      .catch(console.log);
  }
});

function getQuestions() {
  fetch('/api/questions')
    .then(result => result.json())
    .then((result) => {
      const questions = result;
      console.log(questions);
      return listQuestions(questions);
    })
    .catch((err) => console.log(err.message));
}

function listQuestions(questionList) {
  console.log('something is happening');
  const questionsTemplate = document.getElementById('questions-template').innerHTML;
  const compiledTemplate = Handlebars.compile(questionsTemplate);
  const questions = compiledTemplate(questionList);
  questionContainer.innerHTML = questions;
}

getQuestions();