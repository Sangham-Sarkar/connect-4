import React from "react";
import "./rules.css";
import checkIcon from "../../assets/images/icon-check.svg";

export default function Rules({ onBackToMenu }) {
  return (
    <div className="rules-bg">
      <div className="rules-card">
        <h1 className="rules-title">RULES</h1>
        <div className="rules-section">
          <h2 className="rules-heading">OBJECTIVE</h2>
          <p className="rules-body">
            Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className="rules-section">
          <h2 className="rules-heading">HOW TO PLAY</h2>
          <ol className="rules-list">
            <li><b>Red goes first in the first game.</b></li>
            <li>Players must alternate turns, and only one disc can be dropped in each turn.</li>
            <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
            <li>The starter of the previous game goes second on the next game.</li>
          </ol>
        </div>
      </div>
      <button className="rules-check-btn" onClick={onBackToMenu}>
        <img src={checkIcon} alt="Back to Menu" />
      </button>
    </div>
  );
}