$(document).ready(function() {

var gameObject = {
  questions: [
    {
      title: "What color is the sky?",
      answers: [
        "blue",
        "green",
        "red",
        "purple"
      ],
      correctAnswer: 0,
      userSelection: '',
      image: 'assets/images/unc-chapel-hill-logo.jpg'
    },
    {
      title: "What color is UNC blue?",
      answers: [
        "Duke blue",
        "Sky blue",
        "red",
        "purple"
      ],
      correctAnswer: 1,
      userSelection: ''
    },
    {
      title: "What color is UNC blue?",
      answers: [
        "Duke blue",
        "Sky blue",
        "red",
        "purple"
      ],
      correctAnswer: 1,
      userSelection: ''
    },
  ],
  currentQuestion: 0,
  userCorrect: 0,
  userIncorrect: 0,
  userBlank: 0,
  timer: 30,
  timerRunning: false
};

// Global variables

// HTML selectors
var gameTitleSection = $('#title');
var startButtonSection = $('#start');
var timeRemainingSection = $('#timeRemaining');
var triviaQuestionSection = $('#questions');
var triviaAnswerSection = $('#answers');
var triviaAnswerImageSection = $('#images');
var doneButtonSection = $('#done');
var userScoreSection = $('#userScore');
var userSelection;
// Empty array for user score functions
var arr = [];

// RENDER FUNCTIONS

function renderTitleSection() {
  var html = '';
  html += `<h1>Trivia Game</h1>`
  gameTitleSection.html(html);
}

// Render start button
function renderStartButtonSection() {
  // Declare empty string html variable
  var html = '';
  // Add start game button
  html += '<a href="#" class="btn btn-success startGame">Start Game</a>'
  // Display button in HTML
  startButtonSection.html(html);
  // When someone clicks the button...
  $('.startGame').on("click", function() {
    // Run the start game function (defined below)
    start();
    renderGameQuestion();
    renderGameAnswers();
    // Remove the button
    this.remove();
  });
}

// Render time remaining in the game section
function renderTimeRemainingSection() {
  // Declare empty string html variable
  var html = '';
  // Add h2 tag
  html += '<h2 id=timeLeft></h2>';
  // Display tag in HTML
  timeRemainingSection.html(html);
}

// Render game question
function renderGameQuestion() {
  var html = '';
  html += `<h2>${gameObject.questions[gameObject.currentQuestion].title}</h2>`
  triviaQuestionSection.html(html); 
}

// Render game answers
function renderGameAnswers() {
  var html = '';
  html += `<ul class='question'>`
  html += `<li class='answer' value='0'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[0]}</a></li>`
  html += `<li class='answer' value='1'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[1]}</a></li>`
  html += `<li class='answer' value='2'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[2]}</a></li>`
  html += `<li class='answer' value='3'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[3]}</a></li>`
  html += `</ul>`
  triviaAnswerSection.html(html);
  $('.answer').on('click', function() {
    var answer = $(this).attr('value');
    gameObject.questions[gameObject.currentQuestion].userSelection = Number(answer);
    gameObject.questions[gameObject.currentQuestion].userSelection;
    renderAnswerTitle();
    renderCorrectAnswer();
    betweenTriviaQuestions();
  });
}

function betweenTriviaQuestions() {
  stop();
  changeQuestion();  
  setTimeout(function() {
    triviaAnswerImageSection.empty();
    renderGamePieces();
    start();
    }, 3000);
}

// Render answer page title
function renderAnswerTitle() {
  triviaQuestionSection.empty();
  if(gameObject.questions[gameObject.currentQuestion].userSelection === '') { 
    triviaQuestionSection.html(`<h2>Out of Time!</h2`);
  } else if(gameObject.questions[gameObject.currentQuestion].userSelection === gameObject.questions[gameObject.currentQuestion].correctAnswer) {
    triviaQuestionSection.html(`<h2>Correct!</h2`);
    } else {
      triviaQuestionSection.html(`<h2>Nope!</h2`);
      }
}

function renderCorrectAnswer() {
  triviaAnswerSection.empty();
  if(gameObject.questions[gameObject.currentQuestion].userSelection !== gameObject.questions[gameObject.currentQuestion].correctAnswer)
  triviaAnswerSection.html(`<h2>The correct answer was: ${gameObject.questions[gameObject.currentQuestion].answers[gameObject.questions.correctAnswer]}`);
  renderCorrectAnswerImage();
}

function renderCorrectAnswerImage() {
  var html = '';
  html += `<img src=${gameObject.questions[gameObject.currentQuestion].image} />`;
  triviaAnswerImageSection.html(html); 
}

// GAME FUNCTIONS

// Start game function
 function start() {
  // Conditional - If the timerRunning property is set to true then...
  if(!gameObject.timerRunning) {
    // setInterval by running count function(defined below) every second
    gameObject.timer = 30;

    intervalId = setInterval(count, 1000);
    // Set timerRunning to true
    gameObject.timerRunning = true;
    renderTimeRemainingSection();
    // renderFormSection();
    // renderDoneButtonSection();
  }
}

// Count game timer function
function count() {
  // Select HTML section and display number of seconds remaining
  $('#timeLeft').html(`Time Remaining: ${gameObject.timer}`);
  // Lower timer by one
  gameObject.timer--;
  // Conditional - if timer is equal to 0...
  if(gameObject.timer < 0) {
    // Run stop function(defined below)
    stop();
    renderAnswerTitle();
    renderCorrectAnswer();
    betweenTriviaQuestions();
  }
}

// Stop function
function stop() {
  // Stop the setInterval variable - game timer no longer running
  clearInterval(intervalId);
  // Set timerRunning property to false
  gameObject.timerRunning = false;
}

function checkUserAnswer() {
  if(gameObject.questions[gameObject.currentQuestion].userSelection === '') { 
    gameObject.userBlank++;
  } else if(gameObject.questions[gameObject.currentQuestion].userSelection === gameObject.questions[gameObject.currentQuestion].correctAnswer) {
    gameObject.userCorrect++;
    } else {
      gameObject.userIncorrect++;
      }
}

function convertStringToInt(string) {
return Number(string);
}

function changeQuestion() {
  if(gameObject.currentQuestion === gameObject.questions.length) {
    // The game is over
  } else {
      gameObject.currentQuestion++;
    }
}

// VOID 
function renderGame() {
  renderTitleSection();
  renderStartButtonSection();
}

function renderGamePieces() {
  renderGameQuestion();
  renderGameAnswers();
}

renderGame();

});