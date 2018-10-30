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

// snake

const snake = [];
snake[0] = {
  x: 9 * BOX,
  y: 10 * BOX
};

// directions of the snake

let dir;

document.addEventListener('keydown', direction);

// create portals
// const portal1 = [];
// portal1[0] = {
//   x: 1 * (BOX),
//   y: 3 * (BOX)
// };

// const portal2 = [];
// portal2[0] = {
//   x: 17 * BOX,
//   y: 18 * BOX - 96
// };

// score of the game
let score = 0;

let GameSection = 1;

// keep the score
const PLAYER = {
  playerA: 0,
  playerB: 0
};

function takeScore() {
  if (GameSection === 1) {
    PLAYER.playerA = score;
    GameSection += 1;
    console.log('blablabla');
  } else {
    PLAYER.playerB = score;
    GameSection -= 1;
  }
}console.log(score);

// function to get the directions of the snake

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

// draw all in to the canvas
function draw() {
  CTX.drawImage(GROUND, 0, 0);

  for (let i = 0; i < snake.length; i += 1) {
    CTX.fillStyle = i === 0 ? 'green' : 'white';
    CTX.fillRect(snake[i].x, snake[i].y, BOX, BOX);

    CTX.strokeStyle = 'red';
    CTX.strokeRect(snake[i].x, snake[i].y, BOX, BOX);
  }

  // portals
  // CTX.fillStyle = 'black';
  // CTX.fillRect(portal1[0].x, portal1[0].y, 32, 96);

  // CTX.fillStyle = 'black';
  // CTX.fillRect(portal2[0].x, portal2[0].y, 32, 96);

  // apple
  CTX.drawImage(APPLEIMG, apple.x, apple.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

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

  // if the snake eats the food
  if (snakeX === apple.x && snakeY === apple.y) {
    score += 1;
    apple = {
      x: Math.floor(Math.random() * 17 + 1) * BOX,
      y: Math.floor(Math.random() * 15 + 3) * BOX
    };
    // we don't remove the tail
  } else {
    // remove the tail
    snake.pop();
  }

  // add new Head

  const NEWHEAD = {
    x: snakeX,
    y: snakeY
  };

  // draw the portal

  // function to move the snake across the limits of the board
  // function MoveAcross() {
  //   if (snakeX === portal1) {

  //   }
  // }

  // game over
  if (
    snakeX < BOX
    || snakeX > 17 * BOX
    || snakeY < 3 * BOX
    || snakeY > 17 * BOX
    || collision(NEWHEAD, snake)
  ) {
    clearInterval(game);
    takeScore(game);
  }
  // if ((snakeX >= portal1.x && snakeX <= portal1.x + 32) && (snakeY >= portal1.y && snakeY <= portal1.y + 96)) {}

  snake.unshift(NEWHEAD);

  CTX.fillStyle = 'white';
  CTX.font = '45px Open sans';
  CTX.fillText(score, 2 * BOX, 1.6 * BOX);
}
let game = setInterval(draw, 150);
