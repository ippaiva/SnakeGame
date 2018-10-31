window.onload = function () {
  const cvs = document.getElementById('canvas');
  const ctx = cvs.getContext('2d');

  const cvsW = cvs.width;
  const cvsH = cvs.height;

  const snakeW = 20;
  const snakeH = 20;

  // score
  let score = 0;

  // defaut
  let direction = 'right';

  // Event listener
  document.addEventListener('keydown', getDirection);
  function getDirection(e) {
    if (e.keyCode === 37 && direction !== 'right') {
      direction = 'left';
    } else if (e.keyCode === 38 && direction !== 'down') {
      direction = 'up';
    } else if (e.keyCode === 39 && direction !== 'left') {
      direction = 'right';
    } else if (e.keyCode === 40 && direction !== 'up') {
      direction = 'down';
    }
  }

  function drawSnake(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
  }
  const len = 4;
  const snake = [];

  // snake obj
  for (let i = len - 1; i >= 0; i -= 1) {
    snake.push({
      x: 1,
      y: 0
    });
  }

  // create apple
  let apple = {
    x: Math.floor(Math.random() * (cvsW / snakeW - 1) + 1),
    y: Math.floor(Math.random() * (cvsH / snakeH - 1) + 1)
  };

  // draw the apple function
  function drawApple(x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
  }

  // draw score
  function drawScore() {
    ctx.fillStyle = 'yellow';
    ctx.filText('Score : ', score, 5, cvsH - 5); // ?????
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

  // DRAW everthing
  function draw() {
    ctx.clearRect(0, 0, cvsW, cvsH);
    for (let i = 0; i < snake.length; i += 1) {
      const x = snake[i].x;
      const y = snake[i].y;
      drawSnake(x, y);
    }

    // call function draw apple
    drawApple(apple.x, apple.y);
    // snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // direction
    if (direction === 'left') snakeX -= 1;
    else if (direction === 'up') snakeY -= 1;
    else if (direction === 'right') snakeX += 1;
    else if (direction === 'down') snakeY += 1;

    // increment snake
    if (snakeX === apple.x && snakeY === apple.y) {
      score += 1;
      apple = {
        x: Math.floor(Math.random() * (cvsW / snakeW - 1) + 1),
        y: Math.floor(Math.random() * (cvsH / snakeH - 1) + 1)
      };
    } else {
      snake.pop();
    }
    const newHead = {
      x: snakeX,
      y: snakeY
    };
    snake.unshift(newHead);

    // se Collision
    // if ((snakeX < 0 || snakeY < 0 || snakeX >= cvsW || snakeY >= cvsH|| collision(snakeX, snakeY, snake)))
  }
  CTX.fillStyle = 'white';
  CTX.font = '45px Open sans';
  CTX.fillText(score, 2 * , 1.6 * BOX);
  const game = setInterval(draw, 150);
};
