import React from "react";
import logo from "../../assets/images/logo.svg";
import pvpImg from "../../assets/images/player-vs-player.svg";
import "./mainMenu.css";

export default function MainMenu({ onPvpClick, onRulesClick }) {
  return (
    <div className="Menu">
      <div className="holder">
        <img className="logo" src={logo} alt="Connect 4 Logo" />
        <div className="pvp" onClick={onPvpClick}>
          <span>PLAYER VS PLAYER</span>
          <img src={pvpImg} alt="Player vs Player" />
        </div>
        <div className="rules" onClick={onRulesClick} style={{ cursor: "pointer" }}>
          <p>GAME RULES</p>
        </div>
      </div>
    </div>
  );
}
