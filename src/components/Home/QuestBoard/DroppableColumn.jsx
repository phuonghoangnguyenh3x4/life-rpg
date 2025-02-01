import React from "react";
import { StrictModeDroppable } from "./StrictModeDroppable";
import DraggableTask from "./DraggableTask";

const DroppableColumn = ({ column, tasks, onAddQuest }) => {
  return (
    <StrictModeDroppable droppableId={column.id} key={column.id}>
      {(provided, snapshot) => (
        <div
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2>{column.title}</h2>
          {tasks.map((task, index) => (
            <DraggableTask key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
          <button onClick={() => onAddQuest(column.id)} className="add-quest-button">
            + Add a quest
          </button>
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default DroppableColumn;
