import React, { useEffect, useState } from 'react';
import "../styles/Home/Home.css";
import { Modal } from 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "../components/Home/NavbarComponent.jsx";
import ProfileSection from "../components/Home/ProfileSection.jsx";
import QuestSection from "../components/Home/QuestSection.jsx";

function Home() {  
  const hideAllModals = () => {
    // Hide any open modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
      const modalInstance = Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    // Remove any existing backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.parentNode.removeChild(backdrop));
  }

  useEffect(() => {
    document.body.style.overflow = 'auto';
    hideAllModals();

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="app">
      <NavbarComponent/>
      <ProfileSection/>
      <QuestSection/>
    </div>
  );
}

export default Home;
