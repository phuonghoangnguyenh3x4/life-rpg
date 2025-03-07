import "bootstrap/dist/css/bootstrap.min.css";
import Navbrand from "./Navbrand";
import NavbarLinks from "./NavbarLinks";
import PlayerButton from "./PlayerButton/PlayerButton";

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand custom-navbar">
      <div className="container-fluid">
        <Navbrand />
        <NavbarLinks />
        <PlayerButton />
      </div>
    </nav>
  );
}

export default NavbarComponent;