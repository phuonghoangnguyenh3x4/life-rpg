import NavbarComponent from "../components/Landing/NavbarComponent";
import Hero from "../components/Landing/Hero";
import RegisterModal from "../components/Landing/RegisterModal";
import LoginModal from "../components/Landing/LoginModal";
import { useAuth } from "../context/AuthContext";
import "../styles/Modal.css";
import { Navigate } from "react-router-dom";
import React, { useEffect } from 'react';

function Landing() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
  }, [isAuthenticated]);

  return !isAuthenticated ? (
    <div className="app background-primary" style={{ height: "100vh" }}>
      <NavbarComponent />
      <Hero />
      <RegisterModal />
      <LoginModal />
    </div>
  ) : (
    <Navigate to="/home" />
  );
}

export default Landing;
