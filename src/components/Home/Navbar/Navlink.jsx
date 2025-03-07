import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function Navlink({ text, active }) {
  return (
    <a className={`nav-link custom-navlink text-light ${active ? 'active' : ''}`} href="#">
      {text}
    </a>
  );
}

Navlink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
};

Navlink.defaultProps = {
  active: false
};

export default Navlink;
