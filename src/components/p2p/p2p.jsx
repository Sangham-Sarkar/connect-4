import React, { useState } from "react";
import "./p2p.css";

const ROWS = 6;
const COLS = 7;

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function checkWinner(board, player) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        c + 3 < COLS &&
        board[r][c] === player &&
        board[r][c + 1] === player &&
        board[r][c + 2] === player &&
        board[r][c + 3] === player
      )
        return true;
      if (
        r + 3 < ROWS &&
        board[r][c] === player &&
        board[r + 1][c] === player &&
        board[r + 2][c] === player &&
        board[r + 3][c] === player
      )
        return true;
      if (
        r + 3 < ROWS &&
        c + 3 < COLS &&
        board[r][c] === player &&
        board[r + 1][c + 1] === player &&
        board[r + 2][c + 2] === player &&
        board[r + 3][c + 3] === player
      )
        return true;
      if (
        r - 3 >= 0 &&
        c + 3 < COLS &&
        board[r][c] === player &&
        board[r - 1][c + 1] === player &&
        board[r - 2][c + 2] === player &&
        board[r - 3][c + 3] === player
      )
        return true;
    }
  }
  return false;
}

export default function P2P({ onBackToMenu, onPlayAgain }) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  const handleColumnClick = (col) => {
    if (winner) return;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === 0) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        if (checkWinner(newBoard, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        return;
      }
    }
  };

  return (
    <div className="p2p">
      <button
        className="back-btn"
        onClick={onBackToMenu}
        style={{ marginBottom: 16 }}
      >
        ← Back to Menu
      </button>
      <h2>Connect 4</h2>
      {winner && (
        <div className="winner">
          <div>Player {winner} wins!</div>
          <button onClick={onPlayAgain} style={{ marginRight: 8 }}>
            Play Again
          </button>
          <button onClick={onBackToMenu}>Back to Menu</button>
        </div>
      )}
      <div className="board">
        {board.map((row, rIdx) => (
          <div className="board-row" key={rIdx}>
            {row.map((cell, cIdx) => (
              <div
                className="cell"
                key={cIdx}
                onClick={() => handleColumnClick(cIdx)}
                style={{
                  background:
                    cell === 1
                      ? "red"
                      : cell === 2
                      ? "yellow"
                      : "white",
                  border: "1px solid #333",
                  width: 50,
                  height: 50,
                  display: "inline-block",
                  borderRadius: "50%",
                  margin: 2,
                  cursor: winner ? "not-allowed" : "pointer",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}