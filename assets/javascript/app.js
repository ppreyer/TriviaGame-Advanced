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
      image: 'assets/images/charlotte.png'
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
      userSelection: -1,
      image: 'assets/images/andy.jpg'
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
      userSelection: -1,
      image: 'assets/images/william.jpg'
    },
    {
      title: "Which of these universities is not part of the Research Triangle?",
      answers: [
        "UNC",
        "Duke",
        "Wake Forest",
        "NC State"
      ],
      correctAnswer: 2,
      userSelection: -1,
      image: 'assets/images/wake.png'
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
      userSelection: -1,
      image: 'assets/images/kentucky.png'
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
      userSelection: -1,
      image: 'assets/images/nc_flag.png'
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
      userSelection: -1,
      image: 'assets/images/unc_ram.jpg'
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
  html += `<h4 id=timeLeft>Time Remaining: ${gameObject.timer}</h4>`;
  // Display tag in HTML
  timeRemainingSection.html(html);
  $('timeRemaining').css({
    'margin': '15px'
  })
}

// Render game question
function renderGameQuestion() {
  var html = '';
  html += `<h4>${gameObject.questions[gameObject.currentQuestion].title}</h4>`
  triviaQuestionSection.html(html); 
  $('#questions').css({
    'margin': '30px'
  })
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
  $('#answers').css({'margin': '30px 300px'});
  $('.answer a').css({
    'text-decoration': 'none',
    'color': 'white'
  });
  $('.answer').css({
      'padding': "10px",
      'border-radius': '25px',
      'border': '2px solid #20B2AA',
      'margin-top': '10px',
      'background': '#20B2AA' 
    });

 $('.answer').hover(function(){
        $(this).css('background-color', '#3e8e41');
        }, function(){
        $(this).css('background-color', '#20B2AA');
  })

    $('.answer').on('click', function() {
    var answer = $(this).attr('value');
    gameObject.questions[gameObject.currentQuestion].userSelection = Number(answer);
    gameObject.questions[gameObject.currentQuestion].userSelection;
    checkUserAnswer();
    renderAnswerTitle();
    renderCorrectAnswer();
    renderCorrectAnswerImage();
    betweenTriviaQuestions();
    }) 
}

function betweenTriviaQuestions() {
  stop();
  if(gameObject.currentQuestion === gameObject.questions.length - 1) {
      setTimeout(gameOver, 3000)
  }
  else {
    setTimeout(function() {
    triviaAnswerImageSection.empty();
    gameObject.timer = 20;
    gameObject.currentQuestion++;
    renderTimeRemainingSection();
    renderGamePieces();
    start();
  }, 3000);
  }
}

// Render answer page title
function renderAnswerTitle() {
  triviaQuestionSection.empty();
  if(gameObject.currentQuestion === gameObject.questions.length) {
    triviaAnswerSection.html(`<h4>The correct answer was: ${gameObject.correctAnswers[gameObject.currentQuestion]} </h4>`);
  } else if(gameObject.questions[gameObject.currentQuestion].userSelection === '') { 
      triviaQuestionSection.html(`<h4>Out of Time!</h4>`);
    } else if(gameObject.questions[gameObject.currentQuestion].userSelection === gameObject.questions[gameObject.currentQuestion].correctAnswer) {
        triviaQuestionSection.html(`<h4>Correct!</h4>`);
      } else {
          triviaQuestionSection.html(`<h4>Nope!</h4>`);
        }
  $('#questions').css({
    'margin': '15px'
  })
}

function renderCorrectAnswer() {
  triviaAnswerSection.empty();
  if(gameObject.currentQuestion === gameObject.questions.length) {
      triviaAnswerSection.html(`<ul><li>Correct Answers: ${gameObject.userCorrect}</li><li>Incorrect Answers: ${gameObject.userIncorrect}</li><li>Left Blank: ${gameObject.userBlank}</li></ul>`);
  } else if(gameObject.questions[gameObject.currentQuestion].userSelection !== gameObject.questions[gameObject.currentQuestion].correctAnswer) {
      triviaAnswerSection.html(`<h4>The correct answer was: ${gameObject.correctAnswers[gameObject.currentQuestion]} </h4>`);
    }
  $('#answers').css({
    'margin': '15px'
  })
}

function renderCorrectAnswerImage() {
  var html = '';
  html += `<img id='imageResult' src=${gameObject.questions[gameObject.currentQuestion].image} />`;
  triviaAnswerImageSection.html(html); 
  $('#images').css({
    'margin': '15px'
  })
}

function renderUserScore() {
  triviaQuestionSection.empty();
  triviaAnswerSection.empty();
  triviaQuestionSection.html(`<h4>All done, below is your score!</h4>`);
  triviaAnswerSection.html(`<ul><li>Correct Answers: ${gameObject.userCorrect}</li><li>Incorrect Answers: ${gameObject.userIncorrect}</li><li>Left Blank: ${gameObject.userBlank}</li></ul>`);
}

function renderRestartGameButton() {
  var html = '';
  html += `<button class='btn btn-success' id='restartButton'>Restart Game</button>`
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
    renderCorrectAnswerImage()
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
  triviaAnswerImageSection.empty();
  gameObject.currentQuestion = 0;
  gameObject.userCorrect = 0;
  gameObject.userIncorrect = 0;
  gameObject.userBlank = 0;
  renderTimeRemainingSection();
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