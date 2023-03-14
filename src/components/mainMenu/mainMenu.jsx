import React from "react";
import logo from "../../assets/images/logo.svg";
import pvpImg from "../../assets/images/player-vs-player.svg";
import "./mainMenu.css";
export default function mainMenu() {
  return (
    <div className="Menu">
      <div className="holder">
        <img className="logo" src={logo} />
        <div className="pvp">
          <span>PLAY VS PLAYER</span>
          <img src={pvpImg} />
        </div>
        <div className="rules">
          <p>GAME RULES</p>
        </div>
      </div>
    </div>
  );
}
