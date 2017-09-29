// jQuery Wrapper
$(document).ready(function() {

// Game Application Object
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
var userScoreSection = $('#userScore');
var restartGameButtonSection = $('#restartGame');
// Empty array for user score functions
var arr = [];

// RENDER FUNCTIONS

// Render title of game function
function renderTitleSection() {
  // Declare empty html variable
  var html = '';
  // Add header
  html += `<h1>North Carolina Trivia Game</h1>`
  // Set html to header text
  gameTitleSection.html(html);
}

// Render start game button
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
  // Add css
  $('timeRemaining').css({
    'margin': '25px'
  })
}

// Render game question
function renderGameQuestion() {
  // Declare empty variable
  var html = '';
  // Add text from object property
  html += `<h4>${gameObject.questions[gameObject.currentQuestion].title}</h4>`
  // Add html to page
  triviaQuestionSection.html(html); 
}

// Render game answers
function renderGameAnswers() {
  // Declare empty variable
  var html = '';
  // Add html list 
  html += `<ul class='question'>`
  html += `<li class='answer' value='0'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[0]}</a></li>`
  html += `<li class='answer' value='1'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[1]}</a></li>`
  html += `<li class='answer' value='2'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[2]}</a></li>`
  html += `<li class='answer' value='3'><a href='#'>${gameObject.questions[gameObject.currentQuestion].answers[3]}</a></li>`
  html += `</ul>`
  // Add html to page
  triviaAnswerSection.html(html);
  // Add css
  $('#answers').css({
    'display': 'inline-block',
    'text-align': 'center'
  });
  $('.answer a').css({
    'text-decoration': 'none',
    'color': 'white',
  });
  $('.answer').css({
      'padding': "10px",
      'border-radius': '25px',
      'border': '2px solid #20B2AA',
      'margin-top': '10px',
      'background': '#20B2AA',
      'text-align': 'center',
      'width': '120%'
    });
  $('.answer').hover(function(){
        $(this).css('background-color', '#3e8e41');
        }, function(){
        $(this).css('background-color', '#20B2AA');
  })
    // When user clicks trivia answer button...
    $('.answer').on('click', function() {
      // Declare varible with clicked button's value
      var answer = $(this).attr('value');
      // Set object property to value and convert to a number
      gameObject.questions[gameObject.currentQuestion].userSelection = Number(answer);
      // Invoke functions (defined below)...
      checkUserAnswer();
      renderAnswerTitle();
      renderCorrectAnswer();
      renderCorrectAnswerImage();
      betweenTriviaQuestions();
    }) 
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

// Render the title of correct answer function
function renderCorrectAnswer() {
  // Empty the html section
  triviaAnswerSection.empty();
  // Conditional - if the selected answer doesn't equal the correct answer... 
  if(gameObject.questions[gameObject.currentQuestion].userSelection !== gameObject.questions[gameObject.currentQuestion].correctAnswer) {
    // Then display the correct answer
    triviaAnswerSection.html(`<h4>The correct answer was: ${gameObject.correctAnswers[gameObject.currentQuestion]} </h4>`);
  }
  // Add css
  $('#answers').css({
    'margin': '5px'
  })
}

// Render correct image function
function renderCorrectAnswerImage() {
  // Declare empty variable
  var html = '';
  // Add image to html
  html += `<img id='imageResult' src=${gameObject.questions[gameObject.currentQuestion].image} />`;
  // Add image to the page
  triviaAnswerImageSection.html(html); 
  // Add css
  $('#images').css({
    'margin': '5px 15px 30px 15px'
  })
}

// Render user's final score
function renderUserScore() {
  // Empty approripate html sections of the page
  triviaQuestionSection.empty();
  triviaAnswerSection.empty();
  // Add headline and user score
  triviaQuestionSection.html(`<h4>All done, below is your score!</h4>`);
  triviaAnswerSection.html(`<ul><li>Correct Answers: ${gameObject.userCorrect}</li><li>Incorrect Answers: ${gameObject.userIncorrect}</li><li>Left Blank: ${gameObject.userBlank}</li></ul>`);
}

// Render restart game button function
function renderRestartGameButton() {
  // Declare empty variable
  var html = '';
  // Assign button to variable
  html += `<button class='btn btn-success' id='restartButton'>Restart Game</button>`
  // Add button to the page
  restartGameButtonSection.html(html);
  // Add css
  $('#restartButton').css('margin-bottom', '20px');
  // When user clicks the button...
  $('#restartButton').on('click', function() {
    // Remove button from page
    this.remove();
    // Invoke restartGame function (defined below)
    resetGame();
  });
}

// GAME FUNCTIONS

// Start game function
 function start() {
  // Conditional - If the timerRunning property is set to true then...
  if(!gameObject.timerRunning) {
    // Set timer to 20
    gameObject.timer = 20;
    // setInterval by running count function(defined below) every second
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
    // Add one to user's answers left blank property
    gameObject.userBlank++;
    // Invoke functions (defined above and below)
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

// Work flow in between triva questions
function betweenTriviaQuestions() {
  // Invoke stop timer function
  stop();
  // Conditional - if current question is equal to the last item of the question array...
  if(gameObject.currentQuestion === gameObject.questions.length - 1) {
      // invoke gameOver function after 3 seconds
      setTimeout(gameOver, 3000)
  // else... 
  } else {
      // Pause for three seconds...
      setTimeout(function() {
      // Empty image section
      triviaAnswerImageSection.empty();
      // Set game timer to 20
      gameObject.timer = 20;
      // Add one to currentQuestion property
      gameObject.currentQuestion++;
      // Render the appropriate sections of the page
      renderTimeRemainingSection();
      renderGamePieces();
      // Start the timer
      start();
    }, 3000);
  }
}

// Check user's answer function
function checkUserAnswer() {
  // Conditional - if user selection is corrent...
  if(gameObject.questions[gameObject.currentQuestion].userSelection === gameObject.questions[gameObject.currentQuestion].correctAnswer) {
    // Add one to user's score
    gameObject.userCorrect++;
  // else...
  } else {
      // Add one to user's incorrect score
      gameObject.userIncorrect++;
    }
}

// Change trivia question function
function changeQuestion() {
  // Conditional - if current question is equal to last element...
  if(gameObject.currentQuestion === gameObject.questions.length) {
    // Invoke gameOver function
    return gameOver();
  // else...
  } else {
      // Add one to currentQuestion property
      gameObject.currentQuestion++;
    }
}

// Game over function
function gameOver() {
  // Invoke stop game and appropriate render functions
  stop();
  renderUserScore();
  renderRestartGameButton();
}

// Restart the game function
function resetGame() {
  // Empty appropriate html sections
  timeRemainingSection.empty();
  triviaQuestionSection.empty();
  triviaAnswerSection.empty();
  userScoreSection.empty();
  triviaAnswerImageSection.empty();
  // Reset object properties
  gameObject.currentQuestion = 0;
  gameObject.userCorrect = 0;
  gameObject.userIncorrect = 0;
  gameObject.userBlank = 0;
  gameObject.timer = 20;
  // Render appropriate html sections
  renderTimeRemainingSection();
  renderGamePieces();
  // Start the game timer
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