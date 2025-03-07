import "bootstrap/dist/css/bootstrap.min.css";

function Navbrand() {
  return (
    <a className="navbar-brand fw-bold brand" href="#">
      <img
        src="./images/logo.webp"
        alt="Logo"
        width="30"
        height="30"
        className="d-inline-block align-text-top mx-2"
      />
      LIFE RPG WORLD
    </a>
  );
}

export default Navbrand;
