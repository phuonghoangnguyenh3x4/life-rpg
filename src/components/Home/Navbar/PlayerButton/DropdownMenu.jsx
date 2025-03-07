import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const DropdownMenu = ({ dropdownMenuRef, handleLogOut }) => {
  return (
    <ul
      className="dropdown-menu dropdown-menu-end custom-dropdown"
      ref={dropdownMenuRef}
    >
      <li>
        <a className="dropdown-item" href="#">
          Profile
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          Settings
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <a className="dropdown-item" href="#" onClick={handleLogOut}>
          Logout
        </a>
      </li>
    </ul>
  );
};

DropdownMenu.propTypes = {
  dropdownMenuRef: PropTypes.oneOfType([
    // Accept both callback ref and object ref
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  handleLogOut: PropTypes.func.isRequired
};

export default DropdownMenu;
