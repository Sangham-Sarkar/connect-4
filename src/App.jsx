import React, { useState } from "react";
import "./app.css";
import MainMenu from "./components/mainMenu/mainMenu";
import P2P from "./components/p2p/p2p";
import Rules from "./components/rules/Rules";

export default function App() {
  const [screen, setScreen] = useState("menu"); // "menu" or "p2p"
  const [gameKey, setGameKey] = useState(0); // for resetting game

  const handlePlayAgain = () => {
    setGameKey((k) => k + 1); // force remount P2P
    setScreen("p2p");
  };

  return (
    <div>
      {screen === "menu" && (
        <MainMenu
          onPvpClick={() => setScreen("p2p")}
          onRulesClick={() => setScreen("rules")}
        />
      )}
      {screen === "p2p" && (
        <P2P
          key={gameKey}
          onBackToMenu={() => setScreen("menu")}
          onPlayAgain={handlePlayAgain}
        />
      )}
      {screen === "rules" && <Rules onBackToMenu={() => setScreen("menu")} />}
    </div>
  );
}
