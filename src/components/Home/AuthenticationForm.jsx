import FloatingInput from "../FloatingInput";

function GetStartedButton() {
  return (
    <div id="authenticationForm">
      <FloatingInput id="emailInput" type="email" labelText="EMAIL" />
      <FloatingInput id="passwordInput" type="password" labelText="PASSWORD" />
    </div>
  );
}

export default GetStartedButton;
