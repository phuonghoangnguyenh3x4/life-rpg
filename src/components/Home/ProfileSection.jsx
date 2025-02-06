import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import $ from "jquery";

const ProfileSection = () => {
  const { player, getPlayerInfo } = useContext(PlayerContext);
  const [progress, setProgress] = useState(0);

  const updateProfile = (player) => {
    $(".player-name").text(player["name"]);
    $(".player-level").text(`💪: Lv ${player["level"]}`);
    $(".player-money").text(`💰: ${player["money"]}💵`);
    $(".player-exp").text(`⛏️: ${player["exp"]} exp`);
    setProgress(player["progress"]);
  };

  useEffect(() => {
    if (player) updateProfile(player)
    else getPlayerInfo();
  }, [player, getPlayerInfo]);

  return (
    <div className="profile-section">
      <img className="avatar" src="images/avatar.jpg" alt="avatar" />
      <div className="stat">
        <div className="player-name"></div>
        <div className="player-level"></div>
        <div className="player-money"></div>
        <div className="player-exp"></div>
        <div className="progress player-progress-bar" role="progressbar">
          <div
            className="progress-bar player-progress overflow-visible"
            style={{ width: `${progress}%` }}
          >
            &nbsp;{progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
