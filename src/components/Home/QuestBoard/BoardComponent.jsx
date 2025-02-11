import React, { useState, useEffect, memo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./DroppableColumn";
import "../../../styles/Home/Board.css";
import getNewOrderHelper from "../../../helpers/Board/GetNewOrder";
import AddQuestModal from "./AddQuestModal";
import EditQuestModal from "./EditQuestModal";
import $ from 'jquery';
import statusToColor from "../../../helpers/StatusToColor";
import PaginationControl from "./PaginationControl";
import handleDragEnd from "../../../helpers/Board/HandleDragEnd";
import addNewQuestToBoardHelper from "../../../helpers/Board/AddNewQuestToBoard";
import updateQuestToBoardHelper from "../../../helpers/Board/UpdateQuestToBoardHelper";

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

  const [selectedQuest, setSelectedQuest] = useState(null);
  const context = {dataProps, paginationProps, callbackProps, data, setData};

  const addNewQuestToBoard = (newQuest) => {
    addNewQuestToBoardHelper(newQuest, context);
  }

  const updateQuestToBoard = (updatedQuest) => {
    updateQuestToBoardHelper(updatedQuest, context);
  }

  const getNewOrder = (columnId) => {
    return getNewOrderHelper(columnId, context);
  }

  const onDragEnd = async (result) => {
    handleDragEnd(result, context);
  }

  const populateDataOnAddQuest = (columnId) => {
    $("#quest-add-status").text(`${columnId}`).css({ "background-color": statusToColor[columnId]});
  };

  const onTaskClick = (task) => {
    setSelectedQuest(task);
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
        <PaginationControl paginationProps={paginationProps}/>
      </div>
      <AddQuestModal getNewOrder={getNewOrder} addNewQuestToBoard={addNewQuestToBoard}/>
      <EditQuestModal selectedQuest={selectedQuest} updateQuestToBoard={updateQuestToBoard} />
    </>
  );
});

export default BoardComponent;
