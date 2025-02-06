import React, {  } from "react";
import "../../../styles/Home/Board.css";

const AddQuestModal = () => {
  return (
    <>
      <div className="modal custom-modal" id="addQuestModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-content">
            <div className="modal-header border-0 custom-quest-modal-header d-flex flex-column">
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <h5 className="quest-modal-header-text fw-bold">Add Quest</h5>
                <div className="quest-modal-buttons">
                  <button
                    type="button"
                    className="btn btn-secondary custom-quest-close-button"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary custom-quest-save-button"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div
                className="d-flex justify-content-start flex-column"
                style={{ width: "100%" }}
              >
                <div className="m-2"></div>
                <label for="quest-title-input" className="fw-bold">
                  Title*
                </label>
                <input
                  type="text"
                  id="quest-title-input"
                  name="quest-title"
                  className="custom-quest-header-input"
                  placeholder="Add a title"
                />
                <div className="m-2"></div>
                <label for="quest-note-input" className="fw-bold">
                  Note
                </label>
                <textarea
                  type="text"
                  id="quest-note-input"
                  name="quest-note"
                  className="custom-quest-header-input"
                  placeholder="Add notes"
                />
              </div>
              <div className="m-2"></div>
            </div>
            <div className="modal-body">
              <div
                className="d-flex justify-content-start flex-column"
                style={{ width: "100%" }}
              >
                <div className="m-2"></div>
                <label for="quest-difficulty-input" className="fw-bold">
                  Difficulty
                </label>
                <select name="quest-difficulty-input" id="quest-difficulty-input" className="custom-quest-body-input">
                  <option value="Trivial">Trivial</option>
                  <option value="Easy">Easy</option>
                  <option value="Normal">Normal</option>
                  <option value="Hard">Hard</option>
                  <option value="SuperHard">SuperHard</option>
                </select>
                <div className="m-2"></div>
                <div for="quest-status" className="fw-bold">
                  Status: Done
                </div>
                <div className="m-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestModal;
