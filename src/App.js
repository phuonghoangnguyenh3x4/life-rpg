import NavbarComponent from "./components/Home/NavbarComponent";
import Hero from "./components/Home/Hero";
import RegisterModal from "./components/Home/RegisterModal";
import LoginModal from "./components/Home/LoginModal";
import './styles/Modal.css'

function App() {
  return (
    <div className="app background-primary" style={{ height: "100vh" }}>
      <NavbarComponent />
      <Hero />
      <RegisterModal />
      <LoginModal />
    </div>
  );
}

export default App;
