const captainSelection = document.getElementById('captainSelection');
const shipPlacement = document.getElementById('shipPlacement');
const startBtn = document.getElementById('startBtn');
const gridPlayer = document.getElementById('gridPlayer');
const gridBot = document.getElementById('gridBot');
const botBtn = document.getElementById('botTurn');
const log = document.getElementById('log');

let playerShipPositions = [];
let captainSelected = null;

// Funkcja logująca raport
function logMsg(msg) {
    log.textContent += msg + '\n'; // Zamiast logować do konsoli, dodajemy do div'a
}

// Funkcja tworząca siatkę
function createGrid(isPlayer) {
    const grid = isPlayer ? gridPlayer : gridBot;
    grid.innerHTML = ''; // Czyszczenie przed każdą nową planszą

    for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 12; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            grid.appendChild(cell);
        }
    }
}

// Funkcja ustawienia okrętu
function placeShip(x, y, size, isPlayer) {
    const cells = (isPlayer ? gridPlayer : gridBot).querySelectorAll('.cell');
    for (let i = 0; i < size; i++) {
        const cell = Array.from(cells).find(c => c.dataset.x == x + i && c.dataset.y == y);
        if (cell) {
            cell.style.backgroundColor = isPlayer ? 'blue' : 'gray'; // Kolor dla gracza lub bota
        }
    }
}

// Funkcja wyboru kapitana
function selectCaptain(captain) {
    captainSelected = captain;
    captainSelection.style.display = 'none';
    shipPlacement.style.display = 'block';
    createGrid(true);
    createGrid(false); // Plansza bota na razie będzie tylko widoczna
    logMsg(`Wybrano kapitana: ${captain}`);
}

// Funkcja na rozpoczęcie gry
function startGame() {
    shipPlacement.style.display = 'none';
    // Gra się zaczyna, ustawiamy tury
    logMsg('Gra rozpoczęta!');
}

// Dodajemy wybór kapitana
document.getElementById('captainJack').addEventListener('click', () => selectCaptain('Jack Sparrow'));
document.getElementById('captainSalazar').addEventListener('click', () => selectCaptain('Salazar'));
document.getElementById('captainBeckett').addEventListener('click', () => selectCaptain('Lord Beckett'));
document.getElementById('captainJones').addEventListener('click', () => selectCaptain('Davy Jones'));

// Ustawienie okrętu
gridPlayer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return;
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    placeShip(x, y, 3, true); // Umieszczamy okręt o rozmiarze 3 na wybranej pozycji
});

// Rozpoczynamy grę
startBtn.addEventListener('click', startGame);

// Tura bota
botBtn.addEventListener('click', () => {
    // Bot wykonuje turę, to możesz rozwinąć w zależności od implementacji
    logMsg('Bot wykonuje turę...');
});
