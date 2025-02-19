import AuthenticationForm from "./AuthenticationForm";
import FloatingInput from "../FloatingInput";
import $ from "jquery";
import registerValidationSchema from "../../validation/RegisterValidationSchema";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

function RegisterModal() {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  const {login} = useAuth();

  const showErrorToast = (delay=4000) => {
    let toast = $("#custom-toast-register");
    toast.show();
    toast.addClass('fade-out'); // Add fade-out class

    setTimeout(() => {
      toast.hide();
      toast.removeClass('fade-out'); // Remove fade-out class
    }, delay);
  }

  const createAccount = async (name, email, password) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await axios.post(`${apiURL}/auth/create-account`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true 
      });

      const data = response.data;
      console.log(response);
      if (response.status !== 201) {
        throw new Error(data.error);
      }
      console.log(data);
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

  const handleRegister = async () => {
    let name = $("#nameInput-register");
    let email = $("#emailInput-register");
    let password = $("#passwordInput-register");
    let passwordConfirmation = $("#passwordConfirmationInput-register");

    let input = {
      name: name.val(),
      email: email.val(),
      password: password.val(),
      passwordConfirmation: passwordConfirmation.val(),
    };

    try {
      await registerValidationSchema.validate(input, { abortEarly: false });
      let success = await createAccount(input.name, input.email, input.password);
      if (success) login();
      else showErrorToast();
    } catch (ValidationErrors) {
      ValidationErrors.inner.forEach((error) => {
        let elementId = `${error.path}Input-register`;
        let element = $(`#${elementId}`);
        element.addClass("is-invalid");
        let feedback = $(`#${elementId} ~ .invalid-feedback`);
        feedback.text(error.message);
      });
    }
  };

  const handleRetype = (target) => {
    let inputTarget = $(target);
    inputTarget.removeClass("is-invalid");
  };

  return (
    <div className="modal custom-modal" id="registerModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content p-3">
          <div className="modal-header border-0 text-center custom-modal-header">
            <h4 className="modal-title custom-modal-title">
              Welcome to <br />
              Life RPG World
            </h4>
            <button
              type="button"
              className="btn-close btn-close-custom btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center d-flex justify-content-center align-items-center">
            <div id="registerForm">
              <FloatingInput
                id="nameInput-register"
                type="text"
                labelText="NAME"
                onInputChange={(e) => {handleRetype(e.target)}}
              />
              <AuthenticationForm screen="register" />
              <FloatingInput
                id="passwordConfirmationInput-register"
                type="password"
                labelText="CONFIRMATION"
                onInputChange={(e) => {handleRetype(e.target)}}
              />
            </div>
          </div>
          <div className="modal-footer border-0  text-center d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-primary modal-button"
              onClick={handleRegister}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
      <div className="toast-container custom-toast-container">
        <div
          id="custom-toast-register"
          className="toast align-items-center text-bg-danger border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">
            Email already exist
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
