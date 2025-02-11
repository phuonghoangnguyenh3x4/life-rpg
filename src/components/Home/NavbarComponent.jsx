import React, { useRef, useEffect } from "react";
import { Popover, Dropdown } from "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function NavbarComponent() {
  const userIconRef = useRef(null);
  const dropdownToggleRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const apiURL = process.env.REACT_APP_API_URL;
  const { logout, checkAuthStatus } = useAuth();

  const sendLogOutRequest = async () => {
    try {
      let response = await axios.post(
        `${apiURL}/logout`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      console.log(data);
      return true;
    } catch (error) {
      if (error.response.status === 401) {
        checkAuthStatus();
      }
      console.error("Error logging out:", error);
      return false;
    }
  };

  const handleLogOut = async () => {
    let success = await sendLogOutRequest();
    if (success) logout();
  };

  useEffect(() => {
    let popover = new Popover(userIconRef.current, {
        customClass: "custom-popover",
        content: "User",
        trigger: "hover",
        placement: "bottom",
      });

    let dropdown = Dropdown.getInstance(dropdownToggleRef.current);

    const closeDropdown = (event) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !dropdownToggleRef.current.contains(event.target)
      ) {
        dropdown.hide();
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      if (popover) popover.dispose();
      if (dropdown) dropdown.dispose();

      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand custom-navbar">
      <div className="container-fluid">
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
        <div className="navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link custom-navlink active" href="#">
              Quest
            </a>
            <a className="nav-link custom-navlink" href="#">
              Inventory
            </a>
          </div>
        </div>
        <span data-bs-toggle="popover" ref={userIconRef}>
          <div className="dropdown">
            <svg
              ref={dropdownToggleRef}
              id="user-icon"
              className="custom-navbar-icon dropdown-toggle"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <g>
                <path
                  d="M256,281.6c-77.6,0-140.8-63.2-140.8-140.8S178.4,0,256,0s140.8,63.2,140.8,140.8S333.6,281.6,256,281.6z M256,25.6
                c-63.5,0-115.2,51.7-115.2,115.2S192.5,256,256,256s115.2-51.7,115.2-115.2S319.5,25.6,256,25.6z"
                />
                <path
                  d="M460.8,512H51.2c-21.2,0-38.4-17.2-38.4-38.4c0-1.7,0.4-43.1,31.4-84.5c18.1-24.1,42.8-43.2,73.5-56.8
                c37.5-16.7,84-25.1,138.4-25.1s100.9,8.4,138.4,25.1c30.7,13.6,55.4,32.7,73.4,56.8c31,41.3,31.4,82.7,31.4,84.5
                C499.2,494.8,482,512,460.8,512z M256,332.8c-89.3,0-155.1,24.4-190.5,70.6c-26.5,34.6-27.1,69.9-27.1,70.3c0,7,5.7,12.8,12.8,12.8
                h409.6c7.1,0,12.8-5.7,12.8-12.8c0-0.3-0.6-35.7-27.1-70.3C411.1,357.2,345.2,332.8,256,332.8z"
                />
              </g>
            </svg>

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
          </div>
        </span>
      </div>
    </nav>
  );
}

export default NavbarComponent;
