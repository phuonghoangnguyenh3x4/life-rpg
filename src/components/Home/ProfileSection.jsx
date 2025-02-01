import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

function Home() {
  const [player, setPlayer] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;

  const getPlayerInfo = async () => {
    try {
      const response = await axios.get(`${apiURL}/get-player`, {
        withCredentials: true,
      });
      const data = response.data;
      if (response.status !== 200) {
        console.log("data.error", data.error);
        throw new Error(data.error);
      }
      setPlayer(data);
      console.log(data);
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

  const updateProfile = async (player) => {
    $(".player-name").text(player["name"]);
    $(".player-level").text(`💪: Lv ${player["level"]}`);
    $(".player-money").text(`💰: ${player["money"]}💵`);
    $(".player-exp").text(`⛏️: ${player["exp"]} exp`);
  };
  
  useEffect(() => {
    getPlayerInfo();
  }, []);

  useEffect(() => {
    console.log("Player state:", player);
    if (player) updateProfile(player);
  }, [player]);

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
            style={{ width: "10%" }}
          >
            &nbsp;10%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
