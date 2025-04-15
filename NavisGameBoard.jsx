import { useState } from "react";

const BOARD_SIZE = 12;

export default function MorskaBitwaNavis() {
  const [board, setBoard] = useState(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );

  const renderCell = (x, y) => {
    const cell = board[y][x];
    return (
      <div
        key={`${x}-${y}`}
        className="w-8 h-8 border border-gray-400 flex items-center justify-center text-xs bg-blue-100 hover:bg-blue-300 cursor-pointer"
        onClick={() => handleCellClick(x, y)}
      >
        {cell || ""}
      </div>
    );
  };

  const handleCellClick = (x, y) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[y][x] = newBoard[y][x] ? null : "🔘"; // Prosty znacznik
    setBoard(newBoard);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-2">⚓ Morska Bitwa: Navis (Prototyp)</h1>
      <div className="grid grid-cols-12 gap-0">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          return renderCell(x, y);
        })}
      </div>
      <p className="text-sm text-gray-600">Kliknij pola, by zaznaczyć moduły/statki. Prototyp planszy 12x12.</p>
    </div>
  );
}
