import React from "react";
import gameLogo from "../../assets/images/logo.svg";
import discRed from "../../assets/images/counter-red-large.svg";
import discYellow from "../../assets/images/counter-yellow-large.svg";
import pvpImg from "../../assets/images/player-vs-player.svg";
import "./mainMenu.css";

export default function MainMenu({ onPvpClick, onRulesClick }) {
  return (
    <div className="menu-bg">
      <div className="menu-card">
        {/* Four-disc logo */}
        <div className="four-disc-logo">
          <img src={gameLogo} alt="Game Logo" className="game-logo" />
        </div>
        <button className="menu-btn pvp-btn" onClick={onPvpClick}>
          <span>PLAY VS PLAYER</span>
          <img src={pvpImg} alt="Player vs Player" />
        </button>
        <button className="menu-btn rules-btn" onClick={onRulesClick}>
          GAME RULES
        </button>
      </div>
    </div>
  );
}
