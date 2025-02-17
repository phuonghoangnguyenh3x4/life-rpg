import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./DroppableColumn";
import "../../../styles/Home/Board.css";
import AddQuestModal from "./AddQuestModal";
import EditQuestModal from "./EditQuestModal";
import $ from 'jquery';
import statusToColor from "../../../helpers/StatusToColor";
import PaginationControl from "./PaginationControl";
import useBoardState from "../../../hooks/Home/Board/useBoardState";
import useQuestOperations from "../../../hooks/Home/Board/useQuestOperations";
import useSelectedQuest from "../../../hooks/Home/Board/useSelectedQuest";

const BoardComponent = ({
  dataProps,
  paginationProps,
  callbackProps
}) => {
  const { currentPage } = paginationProps;
  const { refetch } = callbackProps;

  const { data, setData } = useBoardState(dataProps, currentPage, refetch);

  const context = {dataProps, paginationProps, callbackProps };
  const {
    addNewQuestToBoard,
    updateQuestToBoard,
    deleteQuestOnBoard,
    getNewOrder,
    onDragEnd
  } = useQuestOperations({ ...context, data, setData });

  const { selectedQuest, onTaskClick } = useSelectedQuest();

  const populateDataOnAddQuest = (columnId) => {
    $("#quest-add-status").text(`${columnId}`).css({ "background-color": statusToColor[columnId]});
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
      <EditQuestModal selectedQuest={selectedQuest} updateQuestToBoard={updateQuestToBoard} deleteQuestOnBoard={deleteQuestOnBoard}/>
    </>
  );
};

export default BoardComponent;
