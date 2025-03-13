import "bootstrap/dist/css/bootstrap.min.css";
import Navbrand from "./Navbrand";
import NavbarLinks from "./NavbarLinks";
import PlayerButton from "./PlayerButton/PlayerButton";
// import { HomeMenubar } from "./Menubar";

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand custom-navbar">
      <div className="container-fluid">
        <Navbrand />
        <NavbarLinks />
        {/* <HomeMenubar /> */}
        <PlayerButton />
      </div>
    </nav>
  );
}

export default NavbarComponent;