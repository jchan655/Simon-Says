var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Check to see if game started
$(document).keypress(function () {
  if (!started) {
    level = 0;
    gamePattern = [];

    nextSequence();
    started = true;
  }
});

// Checks to see when a button is clicked
$(".btn").click(function () {
  userColorChosen = this.id;
  userClickedPattern.push(userColorChosen);
  playSound(userColorChosen);
  animatePress(userColorChosen);
  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);
});

// Generates the next color of the sequence and adds it to the array of game pattern
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Flashes the button
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

// Plays audio of chosen button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animates the button to show that it has been clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      console.log("right");

      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
      console.log("right");
    }
  } else {
    $("body").addClass("game-over");

    gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press a Key to Restart");
    started = false;
  }
}
