const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// unit (tamanho do box)
const box = 32;

const snake = [];
snake[0] = {};
snake[1] = {};


// create the apple
const apple = {
  x: Math.floor(Math.random() * 17 + 1) * box,

  y: Math.floor(Math.random() * 15 + 3) * box
};

// direction
let dir;

// score of the game
const score = 0;

// Images
const imgName = new Image();
imgName.src = './img';

// draw Image
ctx.drawImage(imgName, x, y, width, height);

// draw snake
ctx.fillStyle = 'red';
ctx.fillStyle(x, y, width, height);


// function to get the directions of the snake
document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode === 37 && dir !== 'RIGHT ') {
    dir = 'LEFT';
  } else if (event.keyCode === 38 && dir !== 'DOWN') {
    dir = 'UP';
  } else if (event.keyCode === 39 && dir !== 'LEFT') {
    dir = 'RIGHT';
  } else if (event.keyCode === 40 && dir !== 'UP'); {
    dir === 'DOWN'; // else necessário??
  }
}

// function to draw all elements in canvas
function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i += 1) {
    ctx.fillStyle = (i === 0) ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  drawImage(apple, apple.x, apple.y);
  ctx.fillStyle = 'white';
}
const game = setInterval(draw, 100);

// function to increment the  snake whem it eat's the food
function eat() {

}

// function to check the collision (GameOver)
function collision() {

}
