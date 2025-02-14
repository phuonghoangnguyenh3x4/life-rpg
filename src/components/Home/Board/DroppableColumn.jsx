import React from "react";
import { StrictModeDroppable } from "./StrictModeDroppable";
import DraggableTask from "./DraggableTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DroppableColumn = ({ column, tasks, onAddQuest, onTaskClick }) => {
  return (
    <>
      <StrictModeDroppable droppableId={column.id} key={column.id}>
        {(provided, snapshot) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2>{column.title}</h2>
            {tasks.map((task, index) => (
              task && (
                <DraggableTask
                  key={task.id}
                  task={task}
                  index={index}
                  onTaskClick={onTaskClick}
                />
              )
            ))}
            {provided.placeholder}
            <button
              onClick={() => onAddQuest(column.id)}
              className="add-quest-button"
              data-bs-toggle="modal"
              data-bs-target="#addQuestModal"
            >
              <FontAwesomeIcon icon={faPlus} /> Add a quest
            </button>
          </div>
        )}
      </StrictModeDroppable>
    </>
  );
};

export default DroppableColumn;
