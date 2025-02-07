import React from "react";
import "../../../styles/Home/Board.css";
import $ from "jquery";
import axios from 'axios';

const AddQuestModal = ({getNewOrder, addNewQuestToBoard}) => {
  const apiURL = process.env.REACT_APP_API_URL;

  const handleSave = () => {
    $("#addQuestSubmit").trigger("submit");
  };

  const sendCreateQuestRequest = async (formData) => {
    try {
      const response = await axios.post(`${apiURL}/create-quest`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true 
      });

      const data = response.data;
      console.log(response);
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.error(error.response.data);
      return null;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let status = $('#quest-add-status').text();
    let ord = getNewOrder(status);
    formData.append("status", status);
    formData.append("ord", ord);

    let newQuest = await sendCreateQuestRequest(formData);
    if (newQuest) {
      addNewQuestToBoard(newQuest);
      $("#questAddCloseButton").trigger("click");
    }
  }

  return (
    <>
      <div className="modal custom-modal" id="addQuestModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header border-0 custom-quest-modal-header d-flex flex-column">
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "100%" }}
                >
                  <h5 className="quest-modal-header-text fw-bold">Add Quest</h5>
                  <div className="quest-modal-buttons">
                    <button
                      id="questAddCloseButton"
                      type="button"
                      className="btn btn-secondary custom-quest-close-button"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSave}
                      type="submit"
                      className="btn btn-primary custom-quest-save-button"
                    >
                      Save
                    </button>
                    <input id="addQuestSubmit" type="submit" className="d-none"></input>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-start flex-column"
                  style={{ width: "100%" }}
                >
                  <div className="m-2"></div>
                  <div style={{ width: "100%" }} className="d-flex justify-content-start flex-column">
                    <label htmlFor="quest-title-input" className="fw-bold">
                      Title*
                    </label>
                    <input
                      type="text"
                      id="quest-title-input"
                      name="name"
                      className="custom-quest-header-input"
                      placeholder="Add a title"
                      required
                    />
                  </div>

                  <div className="m-2"></div>
                  <label htmlFor="quest-note-input" className="fw-bold">
                    Note
                  </label>
                  <textarea
                    type="text"
                    id="quest-note-input"
                    name="note"
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
                  <select
                    name="difficulty"
                    id="quest-difficulty-input"
                    className="custom-quest-body-input"
                  >
                    <option value="Trivial">Trivial</option>
                    <option value="Easy">Easy</option>
                    <option value="Normal">Normal</option>
                    <option value="Hard">Hard</option>
                    <option value="SuperHard">SuperHard</option>
                  </select>
                  <div className="m-2"></div>
                  <div className="d-inline-flex align-items-center">
                    <div className="fw-bold me-1">Status:</div>
                    <div
                      id="quest-add-status"
                      className="fw-bold quest-status"
                    ></div>
                  </div>
                  <div className="m-2"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestModal;
