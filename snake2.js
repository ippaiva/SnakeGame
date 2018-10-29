window.onload = function () {
  const cvs = document.getElementById('canvas');
  const ctx = cvs.getContext('2d');

  setInterval(game, 60);

  const step = 1;

  let x = 0;
  let y = 0;

  let px = 0;
  let py = 15;


  function game() {

  }


  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
};
