import React from "react";
import "./rules.css";

export default function Rules({ onBackToMenu }) {
  return (
    <div className="rules-container">
      <button className="back-btn" onClick={onBackToMenu} style={{ marginBottom: 16 }}>
        ← Back to Menu
      </button>
      <h2>Game Rules</h2>
      <ul>
        <li>The game is played on a 7 column by 6 row grid.</li>
        <li>Players take turns dropping one disc into any column.</li>
        <li>The disc falls to the lowest available space in the column.</li>
        <li>The first player to connect four of their discs vertically, horizontally, or diagonally wins.</li>
        <li>If the board fills up and no player has four in a row, the game is a draw.</li>
      </ul>
    </div>
  );
}