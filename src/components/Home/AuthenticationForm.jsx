import FloatingInput from "../FloatingInput";
import $ from "jquery";

function GetStartedButton({ screen }) {
  const handleRetype = (target) => {
    $(target).removeClass("is-invalid");
  };

  return (
    <div id="authenticationForm">
      <FloatingInput
        id={`emailInput-${screen}`}
        type="email"
        labelText="EMAIL"
        onInputChange={((e) => handleRetype(e.target))}
      />
      <FloatingInput
        id={`passwordInput-${screen}`}
        type="password"
        labelText="PASSWORD"
        onInputChange={((e) => handleRetype(e.target))}
      />
    </div>
  );
}

export default GetStartedButton;
