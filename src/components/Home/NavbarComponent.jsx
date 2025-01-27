import GetStartedButton from "./GetStartedButton";

function NavbarComponent() {
    return (
        <nav className="navbar background-primary">
            <div className="container-fluid">
            <a className="navbar-brand fw-bold brand" href="#">
                <img src="./images/logo.webp" alt="Logo" width="30" height="30" className="d-inline-block align-text-top mx-2"/>
                LIFE RPG WORLD
            </a>
            <div className="d-flex ms-auto">
                <button className="btn accent-outline-button me-2 fw-bold">Log in</button>
                <GetStartedButton/>
            </div>
            </div>
        </nav>   
    );
  }
  
  export default NavbarComponent;