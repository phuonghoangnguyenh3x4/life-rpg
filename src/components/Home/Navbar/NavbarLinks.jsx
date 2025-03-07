import "bootstrap/dist/css/bootstrap.min.css";
import Navlink from "./Navlink";

function NavbarLinks() {
  return (
    <div className="navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Navlink text="Quest" active={true} />
        <Navlink text="Inventory" />
        <Navlink text="Habit" />
        <Navlink text="Bonus" />
      </div>
    </div>
  );
}

export default NavbarLinks;
