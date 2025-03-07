import useAuth from "../../../../hooks/useAuth";
import sendLogOutRequest from "../../../../requests/Logout";
import usePopoverDropdown from "./usePopoverDropdown";

const usePlayerButton = () => {
  const { userIconRef, dropdownToggleRef, dropdownMenuRef } =
    usePopoverDropdown();
  const { logout, checkAuthStatus } = useAuth();

  const handleLogOut = async () => {
    let success = await sendLogOutRequest();
    if (success) {
      logout();
    } else {
      checkAuthStatus();
    }
  };

  return { userIconRef, dropdownToggleRef, dropdownMenuRef, handleLogOut };
};

export default usePlayerButton;
