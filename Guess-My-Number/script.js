'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 17;

document.querySelector('.score').textContent = 10;

// --- because the content is empty, we can't use text-content to select it, but we can use value to get it.
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1; // trunc is use to get rip off all decimal, and random gives a number between 0 to 1, not reach 0 and 1.

let currentScore = 20;
let highScore = 0;

// function to show message, score, number
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function displayScore(score) {
  document.querySelector('.score').textContent = score;
}

function displayNumber(number) {
  document.querySelector('.number').textContent = number;
}

// a function to handle score
function lossScore(guess) {
  // guess variable is in function playgame, we should set a variable to pass it.
  if (currentScore > 1) {
    displayMessage(guess > secretNumber ? '🔼 Too High!' : '🔽 Too Low!');
    currentScore--;
    displayScore(currentScore);
  } else {
    displayMessage('💣 You lose!');
    displayScore(0);
  }
}

// function to restart
function restart() {
  currentScore = 20;
  displayScore(currentScore);

  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayNumber('?');
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}

// function to guess
function playgame() {
  const guess = Number(document.querySelector('.guess').value); // the data gets from user interface is usually string.
  //   console.log(guess, typeof guess);

  // when no input
  if (!guess) {
    displayMessage('❌ No Number!');

    // when guess is right
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    displayNumber(secretNumber);

    // change CSS style
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // change highscore
    if (currentScore > highScore) {
      highScore = currentScore;
      document.querySelector('.highscore').textContent = highScore;
    }

    //   // when guess is wrong
    // } else if (guess !== secretNumber) {
    //   if (currentScore > 1) {
    //     document.querySelector('.message').textContent =
    //       guess > secretNumber ? '🔼 Too High!' : '🔽 Too Low!';
    //     currentScore--;
    //     document.querySelector('.score').textContent = currentScore;
    //   } else {
    //     document.querySelector('.message').textContent = '💣 You lose!';
    //     document.querySelector('.score').textContent = 0;
    //   }
    // }

    // when guess is too high
  } else if (guess !== secretNumber) {
    lossScore(guess);
  }
}

document.querySelector('.check').addEventListener('click', function () {
  playgame();
});

document.querySelector('.again').addEventListener('click', function () {
  restart();
});
