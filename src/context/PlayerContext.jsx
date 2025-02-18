import React, { createContext, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  
  const getPlayerInfo = async () => {
    const apiURL = import.meta.env.VITE_APP_API_URL;

    try {
      const response = await axios.get(`${apiURL}/player/get-player`, {
        withCredentials: true,
      });
      const data = response.data;
      if (response.status !== 200) {
        console.log("data.error", data.error);
        throw new Error(data.error);
      }
      setPlayer(data);
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

  return (
    <PlayerContext.Provider value={{ player, getPlayerInfo }}>
      {children}
    </PlayerContext.Provider>
  );
};
