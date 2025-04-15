const grid = document.getElementById('grid');
const log = document.getElementById('log');
const botBtn = document.getElementById('botTurn');

const size = 12;
const cells = [];

function logMsg(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  log.prepend(p);
}

function createGrid() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      grid.appendChild(cell);
      cells.push(cell);
    }
  }
}

function getRandomCell() {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  return { x, y };
}

function botTurn() {
  const { x, y } = getRandomCell();
  const cell = cells.find(c => c.dataset.x == x && c.dataset.y == y);
  if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
    const hit = Math.random() < 0.3; // 30% szansy na trafienie
    cell.classList.add(hit ? 'hit' : 'miss');
    logMsg(`Bot strzelił w (${x + 1}, ${y + 1}) – ${hit ? 'TRAFIONY!' : 'pudło.'}`);
  } else {
    botTurn(); // jeśli już strzelone, próbuj dalej
  }
}

createGrid();
botBtn.addEventListener('click', botTurn);
