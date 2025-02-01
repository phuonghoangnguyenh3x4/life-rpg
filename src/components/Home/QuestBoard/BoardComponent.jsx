import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./DroppableColumn";
import axios from "axios";
import "../../../styles/Home/Board.css";

const BoardComponent = ({ tasks, columns, columnOrder }) => {
  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  useEffect(() => {
    setData({
      tasks: tasks,
      columns: columns,
      columnOrder: columnOrder,
    });
  }, [tasks, columns, columnOrder]);

  const onDragEnd = async (result) => {
    console.log("Drag Ended", result);

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      await changeTaskStatus(draggableId, destination.droppableId);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
    await changeTaskStatus(draggableId, destination.droppableId);
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    const apiURL = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("status", newStatus);

    try {
      const response = await axios.post(`${apiURL}/change-quest-status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });

      const data = response.data;
      console.log(response);
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      console.log(data);
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

  const addQuest = (columnId) => {
    // Add new quest logic
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          <DroppableColumn
            key={column.id}
            column={column}
            tasks={tasks}
            onAddQuest={addQuest}
          />
        );
      })}
    </DragDropContext>
  );
};

export default BoardComponent;
