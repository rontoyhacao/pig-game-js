'use strict';

// selecting elements: buttons
const btnNewGame = document.querySelector(`.btn--new`);
const btnRollDice = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// selecting elements: dice logo
const diceLogo = document.querySelector(`.dice`);

// selecting elements: player scores and names
const elementP1CurrentScore = document.querySelector(`#current--0`);
const elementP2CurrentScore = document.querySelector(`#current--1`);
const elementP1Score = document.querySelector(`#score--0`);
const elementP2Score = document.querySelector(`#score--1`);
const elementP1Name = document.querySelector(`#name--0`);
const elementP2Name = document.querySelector(`#name--1`);

// selecting elements: player background
const elementPlayer1 = document.querySelector(`.player--0`);
const elementPlayer2 = document.querySelector(`.player--1`);

// starting conditions
let currentScore, scores, activePlayer, playing;

// assign conditions and element values back to default, hide dice logo, set to player 1's turn
const init = () => {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  elementP1Score.textContent = 0;
  elementP2Score.textContent = 0;
  elementP1CurrentScore.textContent = 0;
  elementP2CurrentScore.textContent = 0;
  elementP1Name.textContent = `Player 1`;
  elementP2Name.textContent = `Player 2`;

  diceLogo.classList.add(`hidden`);

  elementPlayer1.classList.add(`player--active`);
  elementPlayer2.classList.remove(`player--active`);

  elementPlayer1.classList.remove(`player--winner`);
  elementPlayer2.classList.remove(`player--winner`);
};

// run initialization function upon load
init();

// generate dice number to add up to the current score, display dice logo on roll, and check condition when dice rolls to 1
const rollDice = () => {
  if (playing) {
    const generateDiceNumber = Math.floor(Math.random() * 6) + 1;

    diceLogo.classList.remove(`hidden`);
    diceLogo.src = `dice-${generateDiceNumber}.png`;

    if (generateDiceNumber !== 1) {
      currentScore += generateDiceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// set active player's current score back to 0 and opposite player's turn takes place
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  elementPlayer1.classList.toggle(`player--active`);
  elementPlayer2.classList.toggle(`player--active`);
};

// add active player's current score to final score, check condition when active player's final score reaches 100, finish the game when the active player wins, hide dice logo
const holdScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceLogo.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document.querySelector(`#name--${activePlayer}`).textContent = `Winner!`;
    } else {
      switchPlayer();
    }
  }
};

btnRollDice.addEventListener(`click`, rollDice);
btnHold.addEventListener(`click`, holdScore);
btnNewGame.addEventListener(`click`, init);
