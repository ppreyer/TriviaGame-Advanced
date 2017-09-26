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
      correctAnswer: 0
    },
    {
      title: "What color is UNC blue?",
      answers: [
        "Duke blue",
        "Sky blue",
        "red",
        "purple"
      ],
      correctAnswer: 1
    },
    {
      title: "What color is UNC blue?",
      answers: [
        "Duke blue",
        "Sky blue",
        "red",
        "purple"
      ],
      correctAnswer: 1
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
var doneButtonSection = $('#done');
var userScoreSection = $('#userScore');
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
  html += `<ul>`
  html += `<li><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[0]}</a></li>`
  html += `<li><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[1]}</a></li>`
  html += `<li><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[2]}</a></li>`
  html += `<li><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[3]}</a></li>`
  triviaAnswerSection.html(html);
}

// GAME FUNCTIONS

// Start game function
 function start() {
  // Conditional - If the timerRunning property is set to true then...
  if(!gameObject.timerRunning) {
    // setInterval by running count function(defined below) every second
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
  if(gameObject.timer === 0) {
    // Run stop function(defined below)
    stop();
    done();
  }
}

// VOID 
function render() {
  renderTitleSection();
  renderStartButtonSection();
  renderGameQuestion();
  renderGameAnswers();
}

render();

});