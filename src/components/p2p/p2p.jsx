import React, { useEffect, useState } from "react";
import boardLayerWhite from "../../assets/images/board-layer-white-large.svg";
import boardLayerBlack from "../../assets/images/board-layer-black-large.svg";
import "./p2p.css";
let p1 = 1;
let p2 = 2;

export default function p2p() {
  const posFinder = (e) => {
    let xpos = e.clientX - e.target.offsetLeft;
    for (let i = 0; i <= 6; i++) {
      if (65 * i <= xpos && 65 * (i + 1) >= xpos) {
        console.log(xpos);
        turnPlayed(p1, i);
        console.log(gameState);
      }
    }
  };

  const [gameState, setGameState] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const turnPlayed = (p, pos) => {
    const tempGameState = [...gameState];
    for (let i = 5; 0 <= i; i--) {
      if (gameState[i][pos] == 0) {
        if (p == p1) {
          tempGameState[i][pos] = 1;
        } else {
          tempGameState[i][pos] = 2;
        }
        setGameState(tempGameState);
        break;
      }
    }
  };
  return (
    <div className="p2p">
      <img
        className="boardWhite"
        useMap="#gameBoard"
        src={boardLayerWhite}
        onClick={posFinder}
      />
      <img className="boardBlack" src={boardLayerBlack} />
    </div>
  );
}
