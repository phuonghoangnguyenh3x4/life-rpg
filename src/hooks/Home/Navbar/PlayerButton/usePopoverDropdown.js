import { useRef, useEffect } from "react";
import { Popover, Dropdown } from "bootstrap/dist/js/bootstrap.min.js";

const usePopoverDropdown = () => {
  const userIconRef = useRef(null);
  const dropdownToggleRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  useEffect(() => {
    let popover = Popover.getInstance(userIconRef.current);
    if (!popover) {
      popover = new Popover(userIconRef.current, {
        customClass: "custom-popover text-light",
        content: "User",
        trigger: "hover",
        placement: "bottom",
      });
    }

    let dropdown = Dropdown.getInstance(dropdownToggleRef.current);

    const closeDropdown = (event) => {
      if (
        dropdown &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !dropdownToggleRef.current.contains(event.target)
      ) {
        dropdown.hide();
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      if (dropdown) dropdown.dispose();
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return { userIconRef, dropdownToggleRef, dropdownMenuRef };
};

export default usePopoverDropdown;
