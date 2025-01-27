import '../styles/FloatingInput.css'

function FloatingInput({ id, type, labelText }) {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control custom-input"
        id={id}
        placeholder={labelText}
      />
      <label for={id} className="custom-label">
        {labelText}
      </label>
    </div>
  );
}

export default FloatingInput;
