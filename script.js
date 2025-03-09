const mathQuizData = [
  {
      question: "What is 2 + 2?",
      choices: ["3", "4", "5", "6"],
      correct: "4"
  },
  {
      question: "What is 3 * 3?",
      choices: ["6", "9", "12", "15"],
      correct: "9"
  },
  {
      question: "What is 10 / 2?",
      choices: ["2", "3", "5", "7"],
      correct: "5"
  },
  {
      question: "What is 5 - 3?",
      choices: ["1", "2", "3", "4"],
      correct: "2"
  },
  {
      question: "What is the square root of 16?",
      choices: ["2", "4", "6", "8"],
      correct: "4"
  },
  {
      question: "What is 7 + 6?",
      choices: ["11", "12", "13", "14"],
      correct: "13"
  },
  {
      question: "What is 8 * 7?",
      choices: ["54", "56", "58", "60"],
      correct: "56"
  },
  {
      question: "What is 100 - 25?",
      choices: ["50", "65", "75", "85"],
      correct: "75"
  },
  {
      question: "What is 12 / 4?",
      choices: ["2", "3", "4", "5"],
      correct: "3"
  },
  {
      question: "What is 6 * 6?",
      choices: ["30", "32", "34", "36"],
      correct: "36"
  }
];

const indianGkQuizData = [
  {
      question: "Who is known as the 'Father of the Nation' in India?",
      choices: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhash Chandra Bose"],
      correct: "Mahatma Gandhi"
  },
  {
      question: "Which is the largest state of India by area?",
      choices: ["Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Rajasthan"],
      correct: "Rajasthan"
  },
  {
      question: "Who was the first Prime Minister of India?",
      choices: ["Lal Bahadur Shastri", "Indira Gandhi", "Jawaharlal Nehru", "Rajiv Gandhi"],
      correct: "Jawaharlal Nehru"
  },
  {
      question: "Which city is the capital of India?",
      choices: ["Mumbai", "Kolkata", "Chennai", "New Delhi"],
      correct: "New Delhi"
  },
  {
      question: "Which Indian city is known as the 'Silicon Valley of India'?",
      choices: ["Mumbai", "Hyderabad", "Pune", "Bangalore"],
      correct: "Bangalore"
  },
  {
      question: "Which river is the longest in India?",
      choices: ["Yamuna", "Ganges", "Brahmaputra", "Godavari"],
      correct: "Ganges"
  },
  {
      question: "Who was the first President of India?",
      choices: ["Dr. Rajendra Prasad", "Sarvepalli Radhakrishnan", "Zakir Husain", "VV Giri"],
      correct: "Dr. Rajendra Prasad"
  },
  {
      question: "Which state is known as the 'Spice Garden of India'?",
      choices: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
      correct: "Kerala"
  },
  {
      question: "Which is the smallest state in India by area?",
      choices: ["Sikkim", "Goa", "Nagaland", "Manipur"],
      correct: "Goa"
  },
  {
      question: "What is the national animal of India?",
      choices: ["Lion", "Elephant", "Tiger", "Peacock"],
      correct: "Tiger"
  },
  {
      question: "Which city is known as the 'City of Joy'?",
      choices: ["Mumbai", "Chennai", "Kolkata", "New Delhi"],
      correct: "Kolkata"
  },
  {
      question: "Which state is known as the 'Land of Rising Sun' in India?",
      choices: ["Arunachal Pradesh", "Assam", "Nagaland", "Sikkim"],
      correct: "Arunachal Pradesh"
  }
];

let quizData = [];

const openingPage = document.getElementById('opening-page');
const startQuizBtn = document.getElementById('start-quiz');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const questionNumberEl = document.getElementById('question-number');
const choicesEls = document.querySelectorAll('.answer');
const choicesTexts = [
  document.getElementById('choice1-text'),
  document.getElementById('choice2-text'),
  document.getElementById('choice3-text'),
  document.getElementById('choice4-text')
];
const submitBtn = document.getElementById('submit');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const retryBtn = document.getElementById('retry');
const mathQuizBtn = document.getElementById('math-quiz');
const indianGkQuizBtn = document.getElementById('indian-gk-quiz');
const timerEl = document.getElementById('time-left');

let currentQuiz = 0;
let score = 0;
let timer;

function loadQuestion() {
  clearTimeout(timer);
  resetTimer();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  choicesTexts.forEach((choiceText, index) => {
      choiceText.innerText = currentQuizData.choices[index];
  });
  questionNumberEl.innerText = `Question ${currentQuiz + 1} of ${quizData.length}`;
  startTimer();
}

function startTimer() {
  let timeLeft = 10;
  timerEl.innerText = timeLeft;
  timer = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;
      if (timeLeft <= 0) {
          submitAnswer();
      }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerEl.innerText = '10';
}

function submitAnswer() {
  const selectedChoice = document.querySelector('input[name="answer"]:checked');
  if (selectedChoice) {
      const selectedAnswer = selectedChoice.nextElementSibling.innerText;
      if (selectedAnswer === quizData[currentQuiz].correct) {
          score++;
      }
  }
  currentQuiz++;
  if (currentQuiz < quizData.length) {
      loadQuestion();
  } else {
      showResults();
  }
}

function showResults() {
  quiz.classList.add('hidden');
  resultsEl.classList.remove('hidden');
  scoreEl.innerText = `You scored ${score} out of ${quizData.length}`;
}

function startQuiz() {
  currentQuiz = 0;
  score = 0;
  resultsEl.classList.add('hidden');
  openingPage.classList.add('hidden');
  quiz.classList.remove('hidden');
  loadQuestion();
}

mathQuizBtn.addEventListener('click', () => {
  quizData = mathQuizData;
  startQuizBtn.disabled = false;
  mathQuizBtn.classList.add('selected');
  indianGkQuizBtn.classList.remove('selected');
});

indianGkQuizBtn.addEventListener('click', () => {
  quizData = indianGkQuizData;
  startQuizBtn.disabled = false;
  indianGkQuizBtn.classList.add('selected');
  mathQuizBtn.classList.remove('selected');
});

startQuizBtn.addEventListener('click', startQuiz);

submitBtn.addEventListener('click', submitAnswer);

retryBtn.addEventListener('click', () => {
  openingPage.classList.remove('hidden');
  resultsEl.classList.add('hidden');
  startQuizBtn.disabled = true;
  mathQuizBtn.classList.remove('selected');
  indianGkQuizBtn.classList.remove('selected');
});
