import { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "../../styles/Home/ProfileSection.css";

const ProfileSection = () => {
  const { player, getPlayerInfo } = useContext(PlayerContext);
  const [progress, setProgress] = useState(0);
  const [levelStyle, setLevelStyle] = useState({});
  const [celebration, setCelebration] = useState(false);
  const lastCelebratedLevel = useRef(0);

  useEffect(() => {
    if (player) {
      setProgress(player.progress);
      updateLevelStyle(player.level);
      checkForNewMilestone(player.level);
    } else {
      getPlayerInfo();
    }
  }, [player, getPlayerInfo]);

  const checkForNewMilestone = (currentLevel) => {
    const milestoneInterval = 1;
    const currentMilestone = Math.floor(currentLevel / milestoneInterval) * milestoneInterval;
    
    if (currentMilestone > lastCelebratedLevel.current && currentLevel % milestoneInterval === 0) {
      lastCelebratedLevel.current = currentMilestone;
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    setCelebration(true);
    const timer = setTimeout(() => setCelebration(false), 2000);
    return () => clearTimeout(timer);
  };

  const updateLevelStyle = (level) => {
    const hue = (level * 10) % 360;
    const fontSize = 1 + Math.log10(level) * 0.3;
    const shadowSize = Math.min(level * 0.2, 50);
    
    setLevelStyle({
      color: `hsl(${hue}, 80%, 60%)`,
      textShadow: `0 0 ${shadowSize}px hsl(${hue}, 80%, 60%)`,
      fontSize: `${Math.min(fontSize, 3)}rem`,
      display: 'inline-block',
      transition: 'all 0.3s ease'
    });
  };

  return (
    <div className="profile-section">
      <img className="avatar" src="images/avatar.jpg" alt="avatar" />
      <div className="stat">
        <div className="player-name">{player?.name}</div>
        <div 
          className={`player-level ${celebration ? 'celebrate' : ''}`}
          style={levelStyle}
        >
          💪: Lv {player?.level?.toLocaleString()}
        </div>
        <div className="player-money">💰: {player?.money}💵</div>
        <div className="player-exp">⛏️: {player?.exp} exp</div>
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