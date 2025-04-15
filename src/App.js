import React, { useState } from 'react';
import './App.css';

const gridSize = 12; // Rozmiar planszy 12x12

// Funkcja do generowania pustej planszy
const generateEmptyGrid = () => {
  let grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid.push(Array(gridSize).fill(null));
  }
  return grid;
};

const App = () => {
  // Stan planszy (zaczynamy od pustej)
  const [grid, setGrid] = useState(generateEmptyGrid());

  // Funkcja do kliknięcia na pole (np. zaznaczenie pola, atak)
  const handleCellClick = (row, col) => {
    // Dodaj logikę tutaj np. atak, ruch, itp.
    console.log(`Clicked on cell: Row ${row}, Col ${col}`);
  };

  // Renderowanie planszy
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className="cell"
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell ? cell : ''}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="game">
      <h1>MargotGame: Morska Bitwa</h1>
      <div className="grid">{renderGrid()}</div>
    </div>
  );
};

export default App;
