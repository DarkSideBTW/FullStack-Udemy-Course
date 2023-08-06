const buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $('h1').text('level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(), 1000;
      });
    }
  } else {
    console.log('wrong');
    var wrongSound = new Audio('./sounds/wrong.mp3');
    wrongSound.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 100);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;

  $('h1').text('level ' + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .animate({ opacity: 0.5 })
    .animate({ opacity: 1 });

  playSound(randomChosenColour);
}

function playSound(name) {
  var randomSound = new Audio('./sounds/' + name + '.mp3');
  randomSound.play();
}

function animatePress(name) {
  $('#' + name).addClass('pressed');
  setTimeout(function () {
    $('#' + name).removeClass('pressed');
  }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
