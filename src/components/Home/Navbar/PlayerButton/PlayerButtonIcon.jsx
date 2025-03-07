import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function PlayerButtonIcon({ ref }) {
  return (
    <svg
      ref={ref}
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
  );
}

PlayerButtonIcon.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default PlayerButtonIcon;
