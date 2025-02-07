import AuthenticationForm from "./AuthenticationForm";
import $ from "jquery";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginModal() {
  const apiURL = process.env.REACT_APP_API_URL;
  const { login } = useAuth();
  const navigate = useNavigate();

  const showErrorToast = (delay=4000) => {
    let toast = $("#custom-toast-login");
    toast.show();
    toast.addClass('fade-out'); // Add fade-out class

    setTimeout(() => {
      toast.hide();
      toast.removeClass('fade-out'); // Remove fade-out class
    }, delay);
  }

  const sendLoginRequest = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(`${apiURL}/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const data = response.data;
      if (response.status !== 202) {
        console.log("data.error", data.error);
        throw new Error(data.error);
      }
      console.log(data);
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

  const handleLogin = async () => {
    let email = $("#emailInput-login");
    let password = $("#passwordInput-login");

    let success = await sendLoginRequest(email.val(), password.val());
    if (success) {
      await login()
      navigate("/home");
    }
    else showErrorToast();
  };

  return (
    <div className="modal custom-modal" id="loginModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content p-3">
          <div className="modal-header border-0 text-center custom-modal-header">
            <button
              type="button"
              className="btn-close btn-close-custom btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center d-flex justify-content-center align-items-center">
            <div id="loginForm">
              <AuthenticationForm screen="login" />
            </div>
          </div>
          <div className="modal-footer border-0 text-center d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-primary modal-button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="toast-container custom-toast-container">
        <div
          id="custom-toast-login"
          className="toast align-items-center text-bg-danger border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">
            Incorrect email or password
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
