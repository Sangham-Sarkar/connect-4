import React, { useEffect, useState } from "react";
let p1 = 1;
let p2 = 2;
export default function p2p() {
  const [gameState, setGameState] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [9, 0, 0, 0, 0, 0, 0],
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
  useEffect(() => {
    turnPlayed(p2, 2);
  }, []);

  return <div></div>;
}
