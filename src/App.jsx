import React, { useState } from "react";
import "./App.css";
import MainMenu from "./components/mainMenu/mainMenu";
import P2P from "./components/p2p/p2p";
import Rules from "./components/rules/Rules";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [gameKey, setGameKey] = useState(0);

  const handlePlayAgain = () => {
    setGameKey((k) => k + 1); 
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
