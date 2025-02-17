import NavbarComponent from "../components/Landing/NavbarComponent";
import Hero from "../components/Landing/Hero";
import RegisterModal from "../components/Landing/RegisterModal";
import LoginModal from "../components/Landing/LoginModal";
import { useAuth } from "../context/AuthContext";
import "../styles/Modal.css";
import { Navigate } from "react-router-dom";
import React from "react";
import "../styles/Landing/LandingBackground.css"

function Landing() {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <div className="landing">
      <div className="rpg-bg-overlay"></div>
      <div className="landing-content">
        <NavbarComponent />
        <Hero />
      </div>
      <RegisterModal />
      <LoginModal />
    </div>
  ) : (
    <Navigate to="/home" />
  );
}

export default Landing;
