const grid = document.getElementById('grid');
const enemyGrid = document.getElementById('enemyGrid');
const log = document.getElementById('log');
const botBtn = document.getElementById('botTurn');

const size = 12;
const cells = [];
const enemyCells = [];

function logMsg(msg) {
    log.textContent += msg + '\n'; // Zamiast logować do konsoli, dodajemy do div'a
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

            const enemyCell = document.createElement('div');
            enemyCell.classList.add('cell');
            enemyCell.dataset.x = x;
            enemyCell.dataset.y = y;
            enemyGrid.appendChild(enemyCell);
            enemyCells.push(enemyCell);
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
    const enemyCell = enemyCells.find(c => c.dataset.x == x && c.dataset.y == y);
    
    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
        const hit = Math.random() < 0.3; // 30% szansa na trafienie
        cell.classList.add(hit ? 'hit' : 'miss');
        
        // Aktualizowanie planszy bota
        if (hit) {
            enemyCell.classList.add('hit');
            logMsg(`Bot strzelił w (${x + 1}, ${y + 1}) – TRAFIONY!`);
        } else {
            enemyCell.classList.add('miss');
            logMsg(`Bot strzelił w (${x + 1}, ${y + 1}) – Pudło.`);
        }
    } else {
        botTurn();
    }
}

function useSonar(x, y) {
    logMsg(`Sonar użyty w (${x + 1}, ${y + 1})`);
    
    // Przeszukujemy obszar 3x3 wokół (x, y) i oznaczamy wyniki
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
                const cell = enemyCells.find(c => c.dataset.x == newX && c.dataset.y == newY);
                if (Math.random() < 0.5) { // 50% szansa na wykrycie
                    cell.classList.add('sonar');
                    logMsg(`Sonar wykrył moduł w (${newX + 1}, ${newY + 1})`);
                }
            }
        }
    }
}

createGrid();
botBtn.addEventListener('click', botTurn);

// Przykład użycia sonaru – przycisk do testu
const sonarBtn = document.createElement('button');
sonarBtn.textContent = 'Użyj sonaru';
document.body.appendChild(sonarBtn);
sonarBtn.addEventListener('click', () => useSonar(5, 5)); // Przykładowe współrzędne
