import "bootstrap/dist/css/bootstrap.min.css";
import DropdownMenu from "./DropdownMenu"; 
import PlayerButtonIcon from "./PlayerButtonIcon";
import usePlayerButton from "../../../../hooks/Home/Navbar/PlayerButton/usePlayerButton";

function PlayerButton() {
  const { userIconRef, dropdownToggleRef, dropdownMenuRef, handleLogOut } = usePlayerButton();

  return (
    <span data-bs-toggle="popover" ref={userIconRef}>
      <div className="dropdown">
        <PlayerButtonIcon ref={dropdownToggleRef} />
        <DropdownMenu dropdownMenuRef={dropdownMenuRef} handleLogOut={handleLogOut} />
      </div>
    </span>
  );
}

export default PlayerButton;