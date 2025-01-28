import "../styles/FloatingInput.css";

function FloatingInput({
  id,
  type,
  labelText,
  onInputChange = null,
}) {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control custom-input"
        id={id}
        placeholder={labelText}
        onInput={onInputChange}
      />
      <label htmlFor={id} className="custom-label">
        {labelText}
      </label>
      <div className="invalid-feedback"></div>
    </div>
  );
}

export default FloatingInput;
