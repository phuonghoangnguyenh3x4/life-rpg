import AuthenticationForm from "./AuthenticationForm";

function LoginModal() {
    return (
        <div className="modal custom-modal" id="loginModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-content p-3">
            <div className="modal-header border-0 text-center custom-modal-header">
              <button type="button" className="btn-close btn-close-custom btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center d-flex justify-content-center align-items-center">
              <div id="loginForm">
                <AuthenticationForm screen="login"/>
              </div>
            </div>
            <div className="modal-footer border-0  text-center d-flex justify-content-center align-items-center">
              <button type="button" className="btn btn-primary modal-button">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginModal;
  