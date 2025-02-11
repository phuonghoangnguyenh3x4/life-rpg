import React, { useState, useEffect, memo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./DroppableColumn";
import "../../../styles/Home/Board.css";
import { LexoRank } from "lexorank";
import sendChangeOrderRequest from "../../../requests/ChangeQuestOrder";
import AddQuestModal from "./AddQuestModal";
import EditQuestModal from "./EditQuestModal";
import $ from 'jquery';
import statusToColor from "../../../helpers/StatusToColor";
import calculateTaskOrder from "../../../helpers/CalculateTaskOrder";

const BoardComponent = memo(({
  dataProps,
  paginationProps,
  callbackProps
}) => {
  const { tasks, columns, columnOrder, prevOrds, nextOrds } = dataProps;
  const { currentPage, onNextPage, onPrevPage, pages } = paginationProps;
  const { changeTaskStatus, refetch } = callbackProps;

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

    const changeTaskOrder = async (newState) => {
      let columnName = destination.droppableId;
      let destinationCol = newState.columns[columnName];
      let taskIndex = destination.index;
      let questId = destinationCol.taskIds[taskIndex];

      let newOrd = calculateTaskOrder(
        newState,
        columnName,
        destinationCol,
        taskIndex,
        prevOrds,
        nextOrds
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

  const populateDataOnAddQuest = (columnId) => {
    $("#quest-add-status").text(`${columnId}`).css({ "background-color": statusToColor[columnId]});;
  };

  const populateDataOnEditQuest = (task) => {
    $(`#editQuestModal input[name="name"]`).val(task.name);
    $(`#editQuestModal textarea[name="note"]`).val(task.note);
    $(`#editQuestModal select[name="difficulty"]`).val(task.difficulty);
  };

  const onTaskClick = (task) => {
    console.log("onTaskClick", task);
    populateDataOnEditQuest(task);
    $("#editQuestModal").show();
  }

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
                  onAddQuest={populateDataOnAddQuest}
                  onTaskClick={onTaskClick}
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
      <EditQuestModal/>
    </>
  );
});

export default BoardComponent;
