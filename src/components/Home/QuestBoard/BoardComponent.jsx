import React, { useState, useEffect, memo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./DroppableColumn";
import "../../../styles/Home/Board.css";
import { LexoRank } from "lexorank";
import axios from "axios";
import AddQuestModal from "./AddQuestModal";
import $ from 'jquery';
import statusToColor from "../../../helpers/StatusToColor";

const BoardComponent = memo(({
  tasks,
  columns,
  columnOrder,
  currentPage,
  onNextPage,
  onPrevPage,
  pages,
  changeTaskStatus,
  prevOrds,
  nextOrds,
  refetch
}) => {
  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  });

  useEffect(() => {
    setData({
      tasks: tasks,
      columns: columns,
      columnOrder: columnOrder
    });
  }, [currentPage]);

  const addNewQuestToBoard = (newQuest) => {
    newQuest.id = `${newQuest.id}`;
    console.log(newQuest);
    const col = data.columns[newQuest.status];
    const taskIds = col.taskIds;
    const newTaskIds = [newQuest.id, ...taskIds]
    const newColumn = {
      ...col,
      taskIds: newTaskIds,
    };

    const newTasks = {
      ...data.tasks,
      [newQuest.id]: newQuest,
    }

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newQuest.status]: newColumn,
      },
    };

    setData(newState);
    refetch({cancelRefetch:true});
  }

  const getNewOrder = (columnId) => {
    let prevOrd = prevOrds[columnId];
    let taskIds = columns[columnId].taskIds; 
    let firstTaskId = taskIds.length === 0 ? null : taskIds[0];
    let firstTaskOrd = firstTaskId ? tasks[firstTaskId]['ord'] : null;
    if (prevOrd === null && firstTaskOrd == null) {
      return LexoRank.min().genNext();
    } 
    if (prevOrd === null) {
      return LexoRank.parse(firstTaskOrd).genNext();
    }
    if (firstTaskOrd === null) {
      return LexoRank.parse(prevOrd).between(LexoRank.min())
    }
    prevOrd = LexoRank.parse(prevOrd);
    firstTaskOrd = LexoRank.parse(firstTaskOrd);
    return firstTaskOrd.between(prevOrd);
  }

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

    const sendChangeOrderRequest = async (questId, newOrd) => {
      const apiURL = process.env.REACT_APP_API_URL;
      const formData = new FormData();
      formData.append("id", questId);
      formData.append("ord", newOrd);
      try {
        const response = await axios.post(
          `${apiURL}/change-quest-ord`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

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

    const calculateTaskOrder = (
      newState,
      columnName,
      destinationCol,
      taskIndex
    ) => {
      if (taskIndex === 0 && taskIndex === destinationCol.taskIds.length - 1) {
        if (prevOrds[columnName] === null) {
          return LexoRank.min().genNext();
        }
        let prevOrd = LexoRank.parse(prevOrds[columnName]);
        let nextOrd = LexoRank.min();
        let newOrd = prevOrd.between(nextOrd);
        console.log("prevOrd", prevOrd);
        console.log("nextOrd", nextOrd);
        console.log("newOrd", newOrd);
        return newOrd;
      }
      if (taskIndex === 0) {
        if (prevOrds[columnName] === null) {
          let nextQuestId = destinationCol.taskIds[taskIndex + 1];
          let nextQuest = newState.tasks[nextQuestId];
          let nextOrd = LexoRank.parse(nextQuest["ord"]);
          let newOrd = nextOrd.genNext();
          return newOrd;
        }

        let prevOrd = LexoRank.parse(prevOrds[columnName]);
        let nextQuestId = destinationCol.taskIds[taskIndex + 1];
        let nextQuest = newState.tasks[nextQuestId];
        let nextOrd = LexoRank.parse(nextQuest["ord"]);
        let newOrd = prevOrd.between(nextOrd);
        return newOrd;
      }
      if (taskIndex === destinationCol.taskIds.length - 1) {
        let nextOrd = LexoRank.min();
        if (nextOrds[columnName] !== null) {
          nextOrd = LexoRank.parse(nextOrds[columnName]);
        }
        console.log("nextOrd", nextOrd);
        let prevQuestId = destinationCol.taskIds[taskIndex - 1];
        let prevQuest = newState.tasks[prevQuestId];
        let prevOrd = LexoRank.parse(prevQuest["ord"]);
        console.log("prevOrd", prevOrd);
        console.log("prevQuest", prevQuest);
        let newOrd = prevOrd.between(nextOrd);
        console.log("newOrd", newOrd);
        return newOrd;
      }
      let prevQuestId = destinationCol.taskIds[taskIndex - 1];
      let prevQuest = newState.tasks[prevQuestId];

      let nextQuestId = destinationCol.taskIds[taskIndex + 1];
      let nextQuest = newState.tasks[nextQuestId];

      let prevOrd = LexoRank.parse(prevQuest["ord"]);
      let nextOrd = LexoRank.parse(nextQuest["ord"]);
      let newOrd = prevOrd.between(nextOrd);

      return newOrd;
    };

    const changeTaskOrder = async (newState) => {
      let columnName = destination.droppableId;
      let destinationCol = newState.columns[columnName];
      let taskIndex = destination.index;
      let questId = destinationCol.taskIds[taskIndex];

      let newOrd = calculateTaskOrder(
        newState,
        columnName,
        destinationCol,
        taskIndex
      );
      await sendChangeOrderRequest(questId, newOrd);
      refetch({cancelRefetch:true});
    };

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

      changeTaskOrder(newState);
      setData(newState);
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
    changeTaskOrder(newState);
    changeTaskStatus(draggableId, destination.droppableId);
  };

  const addQuest = (columnId) => {
    $("#quest-add-status").text(`${columnId}`).css({ "background-color": statusToColor[columnId]});;
  };

  return (
    <>
      <div className="board-container">
        <div>
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
        </div>
        <div className="pagination-controls">
          <button onClick={onPrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={onNextPage} disabled={currentPage === pages}>
            Next
          </button>
        </div>
      </div>
      <AddQuestModal getNewOrder={getNewOrder} addNewQuestToBoard={addNewQuestToBoard}/>
    </>
  );
});

export default BoardComponent;
