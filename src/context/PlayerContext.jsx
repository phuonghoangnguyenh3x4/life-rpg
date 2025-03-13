import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import sendGetPlayerRequest from "@/requests/GetPlayer";
import sendHeatmapRequest from "@/requests/GetHeatmap";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  
  const getPlayerInfo = async () => {    
    let playerInfo = await sendGetPlayerRequest();
    if (playerInfo) {
      setPlayer(playerInfo);
    }
    let heatmapInfo = await sendHeatmapRequest();
    if (heatmapInfo) {
      setHeatmap(heatmapInfo);
    }
  };

  return (
    <PlayerContext.Provider value={{ player, heatmap, getPlayerInfo }}>
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.element.isRequired, 
};