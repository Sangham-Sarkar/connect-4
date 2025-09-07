import React, { useState, useEffect } from "react";
import "./p2p.css";

import logo from "../../assets/images/logo.svg";
import playerOneIcon from "../../assets/images/player-one.svg";
import playerTwoIcon from "../../assets/images/player-two.svg";
import boardBlack from "../../assets/images/border-layer-black-large.svg";
import boardWhite from "../../assets/images/border-layer-white-large.svg";
import counterRed from "../../assets/images/counter-red-large.svg";
import counterYellow from "../../assets/images/counter-yellow-large.svg";
import markerRed from "../../assets/images/marker-red.svg";
import markerYellow from "../../assets/images/marker-yellow.svg";

const ROWS = 6;
const COLS = 7;
const TIMER_DURATION = 30;

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function checkWinner(board) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const slice = board[r].slice(c, c + 4);
      if (slice.every((cell) => cell && cell === slice[0])) {
        return slice[0];
      }
    }
  }
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c] &&
        board[r][c] === board[r + 2][c] &&
        board[r][c] === board[r + 3][c]
      ) {
        return board[r][c];
      }
    }
  }
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c + 1] &&
        board[r][c] === board[r + 2][c + 2] &&
        board[r][c] === board[r + 3][c + 3]
      ) {
        return board[r][c];
      }
    }
  }
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r - 1][c + 1] &&
        board[r][c] === board[r - 2][c + 2] &&
        board[r][c] === board[r - 3][c + 3]
      ) {
        return board[r][c];
      }
    }
  }
  return null;
}

export default function P2P({ onBackToMenu }) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1); 
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCol, setHoveredCol] = useState(null);

  const resetBoard = (isFullRestart = false) => {
    setBoard(createEmptyBoard());
    setWinner(null);
    setIsDraw(false);
    setCurrentPlayer(isFullRestart ? 1 : (prev) => (prev === 1 ? 2 : 1));
    setTimer(TIMER_DURATION);
  };

  const handleRestart = () => {
    resetBoard(true);
    setScores({ 1: 0, 2: 0 });
  };

  const handleColumnClick = (col) => {
    if (winner || isDraw || isPaused || board[0][col] !== null) return;

    const newBoard = board.map((row) => [...row]);
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r][col] === null) {
        newBoard[r][col] = currentPlayer;
        break;
      }
    }

    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      setScores((prev) => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
    } else if (newBoard.flat().every((cell) => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setTimer(TIMER_DURATION);
    }
  };

  useEffect(() => {
    if (winner || isDraw || isPaused) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [winner, isDraw, isPaused]);

  useEffect(() => {
    if (timer === 0 && !winner && !isDraw && !isPaused) {
      const availableCols = board[0]
        .map((cell, index) => (cell === null ? index : -1))
        .filter((index) => index !== -1);

      if (availableCols.length > 0) {
        const randomCol =
          availableCols[Math.floor(Math.random() * availableCols.length)];
        handleColumnClick(randomCol);
      }
    }
  }, [timer]);


  const PlayerCard = ({ playerNum, score }) => (
    <div className={`player-card player-${playerNum}`}>
      <img
        src={playerNum === 1 ? playerOneIcon : playerTwoIcon}
        alt={`Player ${playerNum}`}
        className="player-icon"
      />
      <h3>PLAYER {playerNum}</h3>
      <p className="score">{score}</p>
    </div>
  );

  const TurnIndicator = () => (
    <div className={`turn-indicator player-${currentPlayer}-turn`}>
      <p>PLAYER {currentPlayer}'S TURN</p>
      <p className="timer-text">{timer}s</p>
    </div>
  );

  const ResultDisplay = () => (
    <div className="winner-display">
      {isDraw ? (
        <>
          <h3>DRAW</h3>
        </>
      ) : (
        <>
          <p>PLAYER {winner}</p>
          <h3>WINS</h3>
        </>
      )}
      <button className="play-again-btn" onClick={() => resetBoard(false)}>
        PLAY AGAIN
      </button>
    </div>
  );

  const PauseMenu = () => (
    <div className="pause-overlay">
      <div className="pause-menu-card">
        <h2>PAUSE</h2>
        <button onClick={() => setIsPaused(false)}>CONTINUE GAME</button>
        <button
          onClick={() => {
            handleRestart();
            setIsPaused(false);
          }}
        >
          RESTART
        </button>
        <button className="quit-btn" onClick={onBackToMenu}>
          QUIT GAME
        </button>
      </div>
    </div>
  );

  return (
    <div className="p2p-container">
      {isPaused && <PauseMenu />}
      <header className="p2p-header">
        <button className="header-btn" onClick={() => setIsPaused(true)}>
          MENU
        </button>
        <img src={logo} alt="Connect 4 Logo" className="p2p-logo" />
        <button className="header-btn" onClick={handleRestart}>
          RESTART
        </button>
      </header>

      <main className="p2p-main">
        <PlayerCard playerNum={1} score={scores[1]} />
        <div className="board-area" onMouseLeave={() => setHoveredCol(null)}>
          <div className="marker-container">
            {hoveredCol !== null && !winner && !isDraw && !isPaused && (
              <img
                src={currentPlayer === 1 ? markerRed : markerYellow}
                alt="marker"
                className="marker"
                style={{ "--col": hoveredCol }}
              />
            )}
          </div>
          <div className="board-grid">
            {Array.from({ length: COLS }).map((_, cIdx) => (
              <div
                key={cIdx}
                className="column"
                onMouseEnter={() => setHoveredCol(cIdx)}
                onClick={() => handleColumnClick(cIdx)}
              />
            ))}
          </div>

          <div className="counters-grid">
            {board.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <div key={`${rIdx}-${cIdx}`} className="cell-container">
                  {cell && (
                    <img
                      src={cell === 1 ? counterRed : counterYellow}
                      alt={cell === 1 ? "red counter" : "yellow counter"}
                      className="counter"
                    />
                  )}
                </div>
              ))
            )}
          </div>

          <img
            src={boardBlack}
            alt="Board Black Layer"
            className="board-layer board-black"
          />
          <img
            src={boardWhite}
            alt="Board White Layer"
            className="board-layer board-white"
          />
        </div>
        <PlayerCard playerNum={2} score={scores[2]} />
      </main>

      <footer className="p2p-footer">
        {winner || isDraw ? <ResultDisplay /> : <TurnIndicator />}
      </footer>
    </div>
  );
}