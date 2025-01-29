import NavbarComponent from "../components/Landing/NavbarComponent";
import Hero from "../components/Landing/Hero";
import RegisterModal from "../components/Landing/RegisterModal";
import LoginModal from "../components/Landing/LoginModal";
import '../styles/Modal.css'

function Landing() {
  return (
    <div className="app background-primary" style={{ height: "100vh" }}>
      <NavbarComponent />
      <Hero />
      <RegisterModal/>
      <LoginModal />
    </div>
  );
}

export default Landing;
