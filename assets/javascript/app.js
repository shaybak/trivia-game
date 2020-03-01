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
var endGameDiv = $("<div>");

// Set up question and answers array
var triviaQuestions = [{
    question: "The asari are native to which planet?",
    choices: ["Palaven", "Tuchanka", "Thessia", "Rannoch", ],
    correct: "Thessia"
  },

  {
    question: "Banished from their homeworld, Quarians live and travel in the [___] Fleet",
    choices: ["Citadel", "Migrant", "Vespasian", "Auren", ],
    correct: "Migrant"
  },

  {
    question: "The geth are a sentient race of machines created by which species?",
    choices: ["Salarians", "Krogan", "Quarians", "Turians", ],
    correct: "Quarians"
  },

  {
    question: "Which turian Spectre was tasked with evaluating Shepard on behalf of the Citadel Council?",
    choices: ["Benezia", "Garrus", "Saren", "Nihlus", ],
    correct: "Nihlus"
  },

  {
    question: "Which squad member can often be found engaged in calibrations?",
    choices: ["Garrus", "Jack", "Miranda", "Kaiden", ],
    correct: "Garrus"
  },

  {
    question: "The mobile unit eventually inhabited by EDI was created by which organization?",
    choices: ["Alliance", "C-Sec", "Cerberus", "Special Tasks Group", ],
    correct: "Cerberus"
  },

  {
    question: "This squad member is a scientific genius and also enjoys show tunes.",
    choices: ["Kasumi", "Mordin", "Zaeed", "Legion", ],
    correct: "Mordin"
  },

  {
    question: "The Krogan are a species unethically sterilized during the Krogan Rebellions by a biological weapon known as the [___].",
    choices: ["genophage", "great sleep", "bio-cache", "genomix refraction", ],
    correct: "genophage",
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

    // choiceValues = [answer1, answer2, answer3, answer4];

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

  $(".question").text(result);

  if (result === "Wrong answer!" || result === "Time's up!") {

    var correction = $("<h3>");
    correction.text("The correct answer is: " + correctAnswer);

    $(".question").append(correction);

    setTimeout(resetGame, 3000);

  } else {

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
  } else if (correctAnswer === "Garrus") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  } else if (correctAnswer === "Cerberus") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  } else if (correctAnswer === "Mordin") {
    $(".image-div").html("<img class='hint-img' src='assets/images/" + correctAnswer + ".png'>");
  } else if (correctAnswer === "genophage") {
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

  // Hide unnecessary elements

  $(".time-left").hide();
  $(".time-left-nested").hide();
  $("button").hide();
  $(".image-div").hide();
  $(".question").hide();

  // Add class to nested end-game-div-2
  endGameDiv.addClass("end-game-div-2");

  // Create game summary element
  var gameSummary = $("<h1>");

  // Add text to game gameSummary
  gameSummary.text("You've completed the game!");


  // Create Elements to display scores
  var scoreSummary = $("<h2>");
  scoreSummary.addClass("score-summary");

  var rightElement = $("<h3>");
  var wrongElement = $("<h3>");

  // Add text to score elements
  scoreSummary.text("SCORE SUMMARY");
  rightElement.text("Right answers: " + rightAnswers);
  wrongElement.text("Wrong answers: " + wrongAnswers);

  // Create "Play Again" button
  var playAgainButton = $("<button>");

  playAgainButton.addClass("btn btn-sm btn-primary play-again");
  playAgainButton.text("Play again!");



  // Append all elements to endGameDiv
  endGameDiv.append(gameSummary);
  endGameDiv.append(scoreSummary);
  endGameDiv.append(rightElement);
  endGameDiv.append(wrongElement);
  endGameDiv.append(playAgainButton);


  // Append endGameDiv div to parent div
  $(".end-game-div").append(endGameDiv);


  $(".play-again").on("click", function() {

    fullReset();

  });

}

function fullReset() {

  stopCountdown();

  $(".end-game-div").empty();

  // Show hidden elements

  $(".time-left").show();
  $(".time-left-nested").show();
  $("button").show();
  $(".image-div").show();
  $(".question").show();

  // Reset question element
  $(".question").text("The question will appear here.");



  // Reset global variables
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
      question: "The asari are native to which planet?",
      choices: ["Palaven", "Tuchanka", "Thessia", "Rannoch", ],
      correct: "Thessia"
    },

    {
      question: "Banished from their homeworld, Quarians live and travel in the [___] Fleet",
      choices: ["Citadel", "Migrant", "Vespasian", "Auren", ],
      correct: "Migrant"
    },

    {
      question: "The geth are a sentient race of machines created by which species?",
      choices: ["Salarians", "Krogan", "Quarians", "Turians", ],
      correct: "Quarians"
    },

    {
      question: "Which turian Spectre was tasked with evaluating Shepard on behalf of the Citadel Council?",
      choices: ["Benezia", "Garrus", "Saren", "Nihlus", ],
      correct: "Nihlus"
    },

    {
      question: "Which squad member can often be found engaged in calibrations?",
      choices: ["Garrus", "Jack", "Miranda", "Kaiden", ],
      correct: "Garrus"
    },

    {
      question: "The mobile unit eventually inhabited by EDI was created by which organization?",
      choices: ["Alliance", "C-Sec", "Cerberus", "Special Tasks Group", ],
      correct: "Cerberus"
    },

    {
      question: "This squad member is a scientific genius and also enjoys show tunes.",
      choices: ["Kasumi", "Mordin", "Zaeed", "Legion", ],
      correct: "Mordin"
    },

    {
      question: "The Krogan are a species unethically sterilized during the Krogan Rebellions by a biological weapon known as the [___].",
      choices: ["genophage", "great sleep", "bio-cache", "genomix refraction", ],
      correct: "genophage",
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
    wrongAnswers++;
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
