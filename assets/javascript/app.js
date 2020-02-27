//jshint esversion: 6

// Set global variables
var rightAnswers = 0;
var wrongAnswers = 0;
var userAnswer = "not chosen";
var correctAnswer = "";
var questionArray = [];
var randomIndex = "";
var timeLeft = 25;
var intervalId;

// Set up question and answers array
var triviaQuestions = [{
    question: "The asari are native to the planet",
    answer1: "Palaven",
    answer2: "Tuchanka",
    answer3: "Thessia",
    answer4: "Rannoch",
    correct: "Thessia"
  },
  {
    question: "Banished from their homeworld, Quarians live and travel in the ________ Fleet",
    answer1: "Citadel",
    answer2: "Migrant",
    answer3: "Vespasian",
    answer4: "Auren",
    correct: "Migrant",
  },
  {
    question: "The geth are a sentient race of machines created by which species?",
    answer1: "Salarians",
    answer2: "Krogan",
    answer3: "Quarians",
    answer4: "Turians",
    correct: "Quarians",
  },
  {
    question: "Which turian Spectre was tasked with evaluating Shepard on behalf of the Citadel Council?",
    answer1: "Benezia",
    answer2: "Garrus",
    answer3: "Saren",
    answer4: "Nihlus",
    correct: "Nihlus",
  }
];


function getValues() {

  // Make sure timeLeft is set or reset to 25
  timeLeft = 25;
  $(".time-left").text(timeLeft);

  // Get random question object array
  randomIndex = Math.floor(Math.random() * triviaQuestions.length);
  console.log(randomIndex);
  correctAnswer = triviaQuestions[randomIndex].correct;
  console.log(correctAnswer);

  displayHint();

  // Call random question
  $(".question").text(triviaQuestions[randomIndex].question);

  // Call associated answers
  $("#answer-choice1").text(triviaQuestions[randomIndex].answer1);
  $("#answer-choice2").text(triviaQuestions[randomIndex].answer2);
  $("#answer-choice3").text(triviaQuestions[randomIndex].answer3);
  $("#answer-choice4").text(triviaQuestions[randomIndex].answer4);

  countdownTimer();

}


function userInterface() {

  $("#answer-choice1").on("click", function() {

    stopCountdown();

    userAnswer = triviaQuestions[randomIndex].answer1;
    console.log(userAnswer);

    winLose();

  });

  $("#answer-choice2").on("click", function() {

    stopCountdown();

    userAnswer = triviaQuestions[randomIndex].answer2;
    console.log(userAnswer);

    winLose();

  });

  $("#answer-choice3").on("click", function() {

    stopCountdown();

    userAnswer = triviaQuestions[randomIndex].answer3;
    console.log(userAnswer);

    winLose();

  });

  $("#answer-choice4").on("click", function() {

    stopCountdown();

    userAnswer = triviaQuestions[randomIndex].answer4;
    console.log(userAnswer);

    winLose();

  });

}


function winLose() {

  if (userAnswer === correctAnswer) {
    rightAnswers++;
    answerScreen("Correct!");
  } else {
    wrongAnswers++;
    answerScreen("Wrong answer!");
  }

}


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


function answerScreen(result) {

  if (randomIndex === 0) {
    $(".question").text(result);
    setTimeout(getValues, 5000);
  } else if (randomIndex === 1) {
    $(".question").text(result);
    setTimeout(getValues, 5000);
  } else if (randomIndex === 2) {
    $(".question").text(result);
    setTimeout(getValues, 5000);
  } else if (randomIndex === 3) {
    $(".question").text(result);
    setTimeout(getValues, 5000);
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


function playGame() {
  getValues();
  userInterface();
}

playGame();
