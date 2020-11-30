const questionBox = document.getElementById('question-box');
const scoreCounter = document.querySelector('#score');
console.log(scoreCounter);
let usedQuestions = [];
let score = 0;

function generateQuestion() {
  fetch('/api/game')
    .then(result => result.json())
    .then((result) => {
      const questionId = result.id;
      if (usedQuestions.indexOf(questionId) === -1) {
        usedQuestions.push(questionId);
        console.log(usedQuestions.length);
        return createQuestionBox(result);
      }
      if (usedQuestions.length > 5) {
        usedQuestions.length = 0;
      }
      return generateQuestion();
    })
    .catch(err => console.log(err.message));
}

function createQuestionBox(questionData) {
  questionBox.addEventListener('click', selectAnswer);
  const gameTemplate = document.getElementById('game-template').innerHTML;
  const compiledTemplate = Handlebars.compile(gameTemplate);
  const question = compiledTemplate(questionData);
  questionBox.innerHTML = question;
}

function selectAnswer(event) {
  console.log(event.target.classList);
  if (event.target.dataset.iscorrect == 0) {
    score = 0;
    event.target.classList.add('red');
    document.querySelector('#question').innerText = 'WRONG ANSWER';
  } else {
    score++;
    event.target.classList.add('green');
    document.querySelector('#question').innerText = 'RIGHT ANSWER';
  }
  scoreCounter.textContent = `SCORE: ${score}`;
  questionBox.removeEventListener('click', selectAnswer);
  setTimeout(generateQuestion, 2000);
}

generateQuestion();