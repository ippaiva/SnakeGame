// window.onload = function () {
const CVS = document.getElementById('canvas');
const CTX = CVS.getContext('2d');

// unit (tamanho do BOX)
const BOX = 32;

// GROUND and apple img loading
const GROUND = new Image();
GROUND.src = 'img/GROUND.png';

const APPLEIMG = new Image();
APPLEIMG.src = 'img/apple.png';

// create the Random apple
let apple = {
  x: Math.floor(Math.random() * 17 + 1) * BOX,
  y: Math.floor(Math.random() * 15 + 3) * BOX
};

// SNAKE
let SNAKE = [];
SNAKE[0] = {
  x: 9 * BOX,
  y: 10 * BOX
};

// directions of the SNAKE
let dir;
document.addEventListener('keydown', direction);

// score of the game
let score = 0;

let gameSession = 1;

// keep the score
const PLAYER = {
  playerA: 0,
  playerB: 0
};

function takeScore() {
  if (gameSession === 1) {
    PLAYER.playerA = score;
    gameSession += 1;
    console.log(score);
  } else {
    PLAYER.playerB = score;
    gameSession -= 1;
  }
  console.log(PLAYER);
}

// function to get the directions of the SNAKE
function direction(event) {
  const btn = event.keyCode;
  if (btn === 37 && dir !== 'RIGHT') {
    dir = 'LEFT';
  } else if (btn === 38 && dir !== 'DOWN') {
    dir = 'UP';
  } else if (btn === 39 && dir !== 'LEFT') {
    dir = 'RIGHT';
  } else if (btn === 40 && dir !== 'UP') {
    dir = 'DOWN';
  }
}

// check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i += 1) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function reset() {
  SNAKE = [];
  SNAKE[0] = {
    x: 9 * BOX,
    y: 10 * BOX
  };
  draw();
  // takeScore();
}

// draw all in to the canvas
function draw() {
  CTX.drawImage(GROUND, 0, 0);

  for (let i = 0; i < SNAKE.length; i += 1) {
    CTX.fillStyle = i === 0 ? 'green' : 'white';
    CTX.fillRect(SNAKE[i].x, SNAKE[i].y, BOX, BOX);
  }

  // apple
  CTX.drawImage(APPLEIMG, apple.x, apple.y);

  // old head position
  let snakeX = SNAKE[0].x;
  let snakeY = SNAKE[0].y;

  // which direction
  if (dir === 'LEFT') {
    snakeX -= BOX;
  }
  if (dir === 'UP') {
    snakeY -= BOX;
  }
  if (dir === 'RIGHT') {
    snakeX += BOX;
  }
  if (dir === 'DOWN') {
    snakeY += BOX;
  }

  // if the SNAKE eats the food
  if (snakeX === apple.x && snakeY === apple.y) {
    score += 1;
    apple = {
      x: Math.floor(Math.random() * 17 + 1) * BOX,
      y: Math.floor(Math.random() * 15 + 3) * BOX
    };
    // we don't remove the tail
  } else {
    // remove the tail
    SNAKE.pop();
  }

  // add new Head
  const NEWHEAD = {
    x: snakeX,
    y: snakeY
  };

  // game over
  if (
    snakeX < BOX
      || snakeX > 17 * BOX
      || snakeY < 3 * BOX
      || snakeY > 17 * BOX
      || collision(NEWHEAD, SNAKE)
  ) {
    clearInterval(game);
    setTimeout(reset, 1000);
    takeScore();
  }

  SNAKE.unshift(NEWHEAD);

  CTX.fillStyle = 'white';
  CTX.font = '45px Open sans';
  CTX.fillText(score, 2 * BOX, 1.6 * BOX);
}
let game;
function startGame() {
  score = 0;
  game = setInterval(draw, 150);
}
// };
