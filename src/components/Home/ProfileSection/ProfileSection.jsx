// import { useContext, useEffect, useState, useRef } from "react";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import "../../../styles/Home/ProfileSection.css";
import QuestHeatmap from "./QuestHeatmap";
import PlayerInfo from "./PlayerInfo";

const ProfileSection = () => {
  const { player, heatmap, getPlayerInfo } = useContext(PlayerContext);

  useEffect(() => {
    if (!player || !heatmap) {
      getPlayerInfo();
    }
  }, [player, heatmap, getPlayerInfo]);

  return (
    <div className="profile-section">
      {player && <PlayerInfo player={player} />}
      {heatmap && <QuestHeatmap value={heatmap} />}
    </div>
  );
};

export default ProfileSection;