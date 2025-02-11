import React, {  } from "react";
import "../../../styles/Home/Board.css";
import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EditQuestModal = () => {
  const handleClose = () => {
    $("#editQuestModal").hide();
  }

  return (
    <>
      <div className="modal custom-modal" id="editQuestModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-content">
            <div className="modal-header border-0 custom-quest-modal-header d-flex flex-column">
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <h5 className="quest-modal-header-text fw-bold">Edit Quest</h5>
                <div className="quest-modal-buttons">
                  <button
                    type="button"
                    className="btn btn-secondary custom-quest-close-button"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
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
                <label htmlFor="quest-title-input" className="fw-bold">
                  Title*
                </label>
                <input
                  type="text"
                  name="quest-title"
                  className="custom-quest-header-input"
                  placeholder="Add a title"
                />
                <div className="m-2"></div>
                <label htmlFor="quest-note-input" className="fw-bold">
                  Note
                </label>
                <textarea
                  type="text"
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
                <label htmlFor="quest-difficulty-input" className="fw-bold">
                  Difficulty
                </label>
                <select name="quest-difficulty-input" className="custom-quest-body-input">
                  <option value="Trivial">Trivial</option>
                  <option value="Easy">Easy</option>
                  <option value="Normal">Normal</option>
                  <option value="Hard">Hard</option>
                  <option value="SuperHard">SuperHard</option>
                </select>
                <div className="m-2"></div>
              </div>
            </div>
            <div className="modal-footer border-0 text-center d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faTrash}
                className="quest-delete-button-icon"
              />
              <div className="quest-delete-button">
                Delete this Quest
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuestModal;
