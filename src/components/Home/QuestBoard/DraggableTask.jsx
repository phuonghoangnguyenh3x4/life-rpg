import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../../../styles/Home/Task.css";

const DraggableTask = ({ task, index }) => {
  const difficultyToColor = {
    Trivial: "gray",
    Easy: "green",
    Normal: "deeppink",
    Hard: "red",
    SuperHard: "orangered",
  };
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-content">
            <div className="task-name">{task.name}</div>
            <div
              className="task-difficulty"
              style={{ "backgroundColor": difficultyToColor[task.difficulty] }}
            >
              {task.difficulty}
            </div>
            <div>{`⛏️: ${task.exp} exp`}</div>
            <div>{`💰: ${task.money}💵`}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask;
