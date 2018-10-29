const CVS = document.getElementById('canvas');
const CTX = CVS.getContext('2d');

// unit (tamanho do BOX)

const BOX = 32;

// GROUND and apple img loading

const GROUND = new Image();
GROUND.src = 'img/GROUND.png';

const APPLEIMG = new Image();
APPLEIMG.src = 'img/apple.png';

// snake

const snake = [];
snake[0] = {
  x: 9 * BOX,
  y: 10 * BOX
};

// create the Random apple

let apple = {
  x: Math.floor(Math.random() * 17 + 1) * BOX,
  y: Math.floor(Math.random() * 15 + 3) * BOX
};

// score of the game

let score = 0;

// directions

let dir;

document.addEventListener('keydown', direction);

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

// cheack collision function
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
    CTX.fillStyle = (i === 0) ? 'green' : 'white';
    CTX.fillRect(snake[i].x, snake[i].y, BOX, BOX);

    CTX.strokeStyle = 'red';
    CTX.strokeRect(snake[i].x, snake[i].y, BOX, BOX);
  }
  CTX.drawImage(APPLEIMG, apple.x, apple.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if (dir === 'LEFT') snakeX -= BOX;
  else if (dir === 'UP') snakeY -= BOX;
  else if (dir === 'RIGHT') snakeX += BOX;
  else if (dir === 'DOWN') snakeY += BOX;

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

  // game over

  if (snakeX < BOX || snakeX > 17 * BOX || snakeY < 3 * BOX || snakeY > 17 * BOX || collision(NEWHEAD, snake)) {
    clearInterval(game);
  }

  snake.unshift(NEWHEAD);

  CTX.fillStyle = 'white';
  CTX.font = '45px Changa one';
  CTX.fillText(score, 2 * BOX, 1.6 * BOX);
}
let game = setInterval(draw, 100);


// function to move the snake across the limits of the board
// function MoveAcross() {
// }
