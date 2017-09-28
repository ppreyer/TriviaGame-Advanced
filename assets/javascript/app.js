$(document).ready(function() {

var gameObject = {
  questions: [
    {
      title: "Which is North Carolina's most populous city?",
      answers: [
        "Charlotte",
        "Raleigh",
        "Durham",
        "Greensboro"
      ],
      correctAnswer: 0,
      userSelection: -1,
      image: 'assets/images/unc-chapel-hill-logo.jpg'
    },
    {
      title: "The Andy Griffith Show was set in Mayberry, North Carolina. Andy at times had to go to Raleigh. Mayberry is...",
      answers: [
        "North of Raleigh",
        "A fictitious place",
        "South of Raleigh",
        "East of Raleigh"
      ],
      correctAnswer: 1,
      userSelection: -1
    },
    {
      title: "Which of these US Presidents was not born in North Carolina?",
      answers: [
        "James K. Polk",
        "Andrew Johnson",
        "William Henry Harrison",
        "Andrew Jackson"
      ],
      correctAnswer: 2,
      userSelection: -1
    },
  {
      title: "Which state does not border North Carolina?",
      answers: [
        "Kentucky",
        "Georgia",
        "Virginia",
        "Tennessee"
      ],
      correctAnswer: 0,
      userSelection: -1
    },
  {
      title: "Which is North Carolina's Official State Moto?",
      answers: [
        "First in Flight",
        "Nothing could be finer than to be in carolina",
        "Blue skies",
        "To be, rather than to seem"
      ],
      correctAnswer: 3,
      userSelection: -1
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
      userSelection: -1
    },
  {
      title: "Which basketball program has the most historic and succesful past (choose wisely)?",
      answers: [
        "Duke",
        "NC State",
        "UNC",
        "Wake Forest"
      ],
      correctAnswer: 2,
      userSelection: -1
    },
  ],
  correctAnswers: ["Charlotte", "A fictitious place", "William Henry Harrison", "Wake Forest", "Kentucky", "To be, rather than to seem", "UNC"],
  currentQuestion: 0,
  userCorrect: 0,
  userIncorrect: 0,
  userBlank: 0,
  timer: 20,
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
var restartGameButtonSection = $('#restartGame');
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
    renderTimeRemainingSection();
    // Remove the button
    this.remove();
    $('#start').remove();
  });
}

// Render time remaining in the game section
function renderTimeRemainingSection() {
  // Declare empty string html variable
  var html = '';
  // Add h2 tag
  html += `<h2 id=timeLeft>Time Remaining: ${gameObject.timer}</h2>`;
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
  $('#answers').css({'margin': '0 250px'});
  $('.answer a').css('text-decoration', 'none');
  $('.answer').css({
      'padding': "10px",
      'border-radius': '25px',
      'border': '2px solid #4B9CD3',
      'margin-top': '10px',
    });
  $('.answer').mouseover(function() {
    $('.answer').css({'transform': 'translateY(4px)'});
  })

    $('.answer').on('click', function() {
    var answer = $(this).attr('value');
    gameObject.questions[gameObject.currentQuestion].userSelection = Number(answer);
    gameObject.questions[gameObject.currentQuestion].userSelection;
    checkUserAnswer();
    console.log('gameObject', gameObject);
    renderAnswerTitle();
    renderCorrectAnswer();
    betweenTriviaQuestions();
    }) 
}

function betweenTriviaQuestions() {
  stop();
  if(gameObject.currentQuestion === gameObject.questions.length) {
    setTimeout(gameOver, 3000);
  } else {
      setTimeout(function() {
        changeQuestion();
        if(gameObject.currentQuestion === gameObject.questions.length) {
          gameOver();
        } else {
        triviaAnswerImageSection.empty();
        gameObject.timer = 20;
        renderTimeRemainingSection();
        renderGamePieces();
        start();
          }
      }, 3000);
    }
} 

// Render answer page title
function renderAnswerTitle() {
  triviaQuestionSection.empty();
  if(gameObject.currentQuestion === gameObject.questions.length) {
    triviaAnswerSection.html(`<h2>The correct answer was: ${gameObject.correctAnswers[gameObject.currentQuestion]}`);
  } else if(gameObject.questions[gameObject.currentQuestion].userSelection === '') { 
      triviaQuestionSection.html(`<h2>Out of Time!</h2`);
    } else if(gameObject.questions[gameObject.currentQuestion].userSelection === gameObject.questions[gameObject.currentQuestion].correctAnswer) {
        triviaQuestionSection.html(`<h2>Correct!</h2`);
      } else {
          triviaQuestionSection.html(`<h2>Nope!</h2`);
        }
}

function renderCorrectAnswer() {
  triviaAnswerSection.empty();
  if(gameObject.currentQuestion === gameObject.questions.length) {
      triviaAnswerSection.html(`<ul><li>Correct Answers: ${gameObject.userCorrect}</li><li>Incorrect Answers: ${gameObject.userIncorrect}</li><li>Left Blank: ${gameObject.userBlank}</li></ul>`);
  } else if(gameObject.questions[gameObject.currentQuestion].userSelection !== gameObject.questions[gameObject.currentQuestion].correctAnswer) {
      triviaAnswerSection.html(`<h2>The correct answer was: ${gameObject.correctAnswers[gameObject.currentQuestion]}`);
      renderCorrectAnswerImage();
    }
}

function renderCorrectAnswerImage() {
  var html = '';
  html += `<img src=${gameObject.questions[gameObject.currentQuestion].image} />`;
  triviaAnswerImageSection.html(html); 
}

function renderUserScore() {
  triviaQuestionSection.empty();
  triviaAnswerSection.empty();
  triviaQuestionSection.html(`<h2>All done, below is your score!</h2>`);
  triviaAnswerSection.html(`<ul><li>Correct Answers: ${gameObject.userCorrect}</li><li>Incorrect Answers: ${gameObject.userIncorrect}</li><li>Left Blank: ${gameObject.userBlank}</li></ul>`);
}

function renderRestartGameButton() {
  var html = '';
  html += `<button id='restartButton'>Restart Game</button>`
  restartGameButtonSection.html(html);
  $('#restartButton').on('click', function() {
    this.remove();
    resetGame();
  });
}

// GAME FUNCTIONS

// Start game function
 function start() {
  // Conditional - If the timerRunning property is set to true then...
  if(!gameObject.timerRunning) {
    // setInterval by running count function(defined below) every second
    gameObject.timer = 20;

    intervalId = setInterval(count, 1000);
    // Set timerRunning to true
    gameObject.timerRunning = true;
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
    gameObject.userBlank++;
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
  if(gameObject.timer === 0) { 
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
    return gameOver();
  } else {
      gameObject.currentQuestion++;
    }
}

function gameOver() {
  stop();
  renderUserScore();
  renderRestartGameButton();
}

function resetGame() {
  timeRemainingSection.empty();
  triviaQuestionSection.empty();
  triviaAnswerSection.empty();
  userScoreSection.empty();
  gameObject.currentQuestion = 0;
  gameObject.userCorrect = 0;
  gameObject.userIncorrect = 0;
  gameObject.userBlank = 0;
  renderGamePieces();
  start();
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