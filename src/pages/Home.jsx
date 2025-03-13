import { useEffect } from "react";
import "../styles/Home/Home.css";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../components/Home/Navbar/NavbarComponent.jsx";
import ProfileSection from "../components/Home/ProfileSection/ProfileSection";
import QuestSection from "../components/Home/QuestSection.jsx";
import { PlayerProvider } from "../context/PlayerContext.jsx";
import "../styles/Home/HomeBackground.css";

function Home() {
  const hideAllModals = () => {
    // Hide any open modals
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      const modalInstance = Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    // Remove any existing backdrops
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.parentNode.removeChild(backdrop));
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    hideAllModals();

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <PlayerProvider>
      <div className="app">
        <div className="rune-overlay" aria-hidden="true"></div>
        <div className="content-wrapper">
          <NavbarComponent />
          <ProfileSection />
          <QuestSection />
        </div>
      </div>
    </PlayerProvider>
  );
}

export default Home;
