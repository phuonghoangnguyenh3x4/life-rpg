/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import "../../../styles/Home/Board.css";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import sendUpdateQuestRequest from "../../../requests/UpdateQuest";
import sendDeleteQuestRequest from "../../../requests/DeleteQuest";
import { PlayerContext } from "../../../context/PlayerContext";

const EditQuestModal = ({ selectedQuest, updateQuestToBoard, deleteQuestOnBoard }) => {
  const [quest, setQuest] = useState({
    id: null,
    name: "",
    note: "",
    status: "Todo",
    difficulty: "Normal"
  });

  const { getPlayerInfo } = useContext(PlayerContext);

  useEffect(() => {
    if (selectedQuest) {
      setQuest({
        id: selectedQuest.id,
        name: selectedQuest.name || "",
        note: selectedQuest.note || "",
        status: selectedQuest.status || "Todo",
        difficulty: selectedQuest.difficulty || "Normal"
      });
    }
  }, [selectedQuest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuest((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = async () => {
    let success = await sendDeleteQuestRequest(quest.id);
    if (success) {
      deleteQuestOnBoard(quest);
      handleClose();
      await getPlayerInfo(); 
    }
  };

  const handleClose = () => {
    $("#editQuestModal").hide();
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("id", quest.id);
    formData.append("name", quest.name);
    formData.append("note", quest.note);
    formData.append("difficulty", quest.difficulty);

    let updatedQuest = await sendUpdateQuestRequest(formData);
    if (updatedQuest) {
      updateQuestToBoard(updatedQuest);
      handleClose();
    }
  };

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
                    onClick={handleSave}
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
                <label className="fw-bold">Title*</label>
                <input
                  type="text"
                  name="name"
                  className="custom-quest-header-input"
                  placeholder="Add a title"
                  value={quest.name}
                  onChange={handleChange}
                />
                <div className="m-2"></div>
                <label className="fw-bold">Note</label>
                <textarea
                  name="note"
                  className="custom-quest-header-input"
                  placeholder="Add notes"
                  value={quest.note}
                  onChange={handleChange}
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
                <label className="fw-bold">Difficulty</label>
                <select
                  name="difficulty"
                  className="custom-quest-body-input"
                  value={quest.difficulty}
                  onChange={handleChange}
                >
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
              <div className="quest-delete-button" onClick={handleDelete}>Delete this Quest</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuestModal;
