



// *******************************************************
// GLOBAL VARIABLES:

// Set global variables
var rightAnswers = 0;
var wrongAnswers = 0;
var userAnswer = "not chosen";
var correctAnswer = "";
var answer1 = "";
var answer2 = "";
var answer3 = "";
var answer4 = "";
var questionArray = [];
var randomIndex = "";
var timeLeft = 25;
var intervalId;

// Set up question and answers array
var triviaQuestions = [{
    question: "The asari are native to the planet",
    choices: ["Palaven", "Tuchanka", "Thessia", "Rannoch", ],
    correct: "Thessia"
  },

  {
    question: "Banished from their homeworld, Quarians live and travel in the ________ Fleet",
    choices: ["Citadel", "Migrant", "Vespasian", "Auren", ],
    correct: "Migrant",
  },

  {
    question: "The geth are a sentient race of machines created by which species?",
    choices: ["Salarians", "Krogans", "Quarians", "Turians", ],
    correct: "Quarians",
  },

  {
    question: "Which turian Spectre was tasked with evaluating Shepard on behalf of the Citadel Council?",
    choices: ["Benezia", "Garrus", "Saren", "Nihlus", ],
    correct: "Nihlus",
  }
];




// *******************************************************
// GAME VALUES AND USER INTERFACE


function initializeGame() {
  // Make sure timeLeft is set (or reset) to 25
  timeLeft = 25;

  // Display countdown in the UI
  $(".time-left").text(timeLeft);
}




// This is where we'll select a question for the current game session:
function getQuestion() {

  if (triviaQuestions.length >= 1) {

    // We'll get the index of a random question object from the main array here:
    randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    // console.log(randomIndex);

    // We assign the associated correct question answer to the global correctAnswer variable
    correctAnswer = triviaQuestions[randomIndex].correct;
    // console.log(correctAnswer);

    // Each answer choice is also assigned to a variable for ease of access
    answer1 = triviaQuestions[randomIndex].choices[0];
    answer2 = triviaQuestions[randomIndex].choices[1];
    answer3 = triviaQuestions[randomIndex].choices[2];
    answer4 = triviaQuestions[randomIndex].choices[3];

    // We call the assignValues function from here to move to the next step
    assignValues();

  } else {

    // If there are no more questions to choose from, we send the user to the endGame interface
    endGame();
  }
}




function assignValues() {

  // Had to add stopCoundown here to keep fullReset from firing multiple
  // countdowns--it was decrementing by two instead of one, but adding
  // a default stop before starting the countdown again seemed to fix the issue
  stopCountdown();

  // Make sure timeLeft is displayed properly (might be able to remove)
  timeLeft = 25;
  $(".time-left").text(timeLeft);

  // Add picture to the HTML page based on
  displayHint();

  // Call random question
  $(".question").text(triviaQuestions[randomIndex].question);

  // Call associated answers
  $("#answer-choice1").text(answer1);
  $("#answer-choice2").text(answer2);
  $("#answer-choice3").text(answer3);
  $("#answer-choice4").text(answer4);

  countdownTimer();

}




// This function allows the user to interact with the game
function userInterface() {

  $("#answer-choice1").on("click", function() {

    stopCountdown();

    userAnswer = answer1;
    console.log(userAnswer);

    winLose();

  });

  $("#answer-choice2").on("click", function() {

    stopCountdown();

    userAnswer = answer2;
    console.log(userAnswer);

    winLose();

  });

  $("#answer-choice3").on("click", function() {

    stopCountdown();

    userAnswer = answer3;
    console.log(userAnswer);

    winLose();

  });

  $("#answer-choice4").on("click", function() {

    stopCountdown();

    userAnswer = answer4;
    console.log(userAnswer);

    winLose();

  });

}



// This function determines if the user's answer was correct or not
// and adjusts accordingly
function winLose() {

  if (userAnswer === correctAnswer) {
    rightAnswers++;
    answerScreen("Correct!");
  } else {
    wrongAnswers++;
    answerScreen("Wrong answer!");
  }

}



function answerScreen(result) {

  if (randomIndex === 0) {
    $(".question").text(result);
    setTimeout(resetGame, 3000);
  } else if (randomIndex === 1) {
    $(".question").text(result);
    setTimeout(resetGame, 3000);
  } else if (randomIndex === 2) {
    $(".question").text(result);
    setTimeout(resetGame, 3000);
  } else if (randomIndex === 3) {
    $(".question").text(result);
    setTimeout(resetGame, 3000);
  }

}



function displayHint() {

  if (correctAnswer === "Thessia") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  } else if (correctAnswer === "Migrant") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  } else if (correctAnswer === "Quarians") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  } else if (correctAnswer === "Nihlus") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  }

}



function resetGame() {

  stopCountdown();

  for (var i = 0; i < triviaQuestions.length; i++) {

    if (correctAnswer === triviaQuestions[i].correct) {
      triviaQuestions.splice(i, 1);

      getQuestion();
    }
  }
}



function endGame() {

  // Ask the user if they'd like to play again.
  confirm("You've completed all questions. Would you like to play again?");

  // If they confirm, do a full reset of all game parameters
  if (confirm) {
    fullReset();
  }

}



function fullReset() {

  stopCountdown();

  rightAnswers = 0;
  wrongAnswers = 0;
  userAnswer = "not chosen";
  correctAnswer = "";
  answer1 = "";
  answer2 = "";
  answer3 = "";
  answer4 = "";
  questionArray = [];
  randomIndex = "";
  timeLeft = 25;
  intervalId = "";

  // Set up question and answers array
  triviaQuestions = [{
      question: "The asari are native to the planet",
      choices: ["Palaven", "Tuchanka", "Thessia", "Rannoch", ],
      correct: "Thessia"
    },

    {
      question: "Banished from their homeworld, Quarians live and travel in the ________ Fleet",
      choices: ["Citadel", "Migrant", "Vespasian", "Auren", ],
      correct: "Migrant",
    },

    {
      question: "The geth are a sentient race of machines created by which species?",
      choices: ["Salarians", "Krogans", "Quarians", "Turians", ],
      correct: "Quarians",
    },

    {
      question: "Which turian Spectre was tasked with evaluating Shepard on behalf of the Citadel Council?",
      choices: ["Benezia", "Garrus", "Saren", "Nihlus", ],
      correct: "Nihlus",
    }
  ];

  getQuestion();

}

// *******************************************************
// Timer functions:

function decrement() {

  timeLeft--;

  $(".time-left").text(timeLeft);

  if (timeLeft === 0) {
    stopCountdown();
    answerScreen("Time's up!");
  }
}


function stopCountdown() {

  clearInterval(intervalId);

}


function countdownTimer() {

  intervalId = setInterval(decrement, 1000);

}


// *******************************************************
// playGame() functions and call:

function playGame() {
  initializeGame();
  getQuestion();
  userInterface();
}

playGame();
