import addNewQuestToBoardHelper from "../../../helpers/Board/AddNewQuestToBoard";
import updateQuestToBoardHelper from "../../../helpers/Board/UpdateQuestToBoard";
import deleteQuestOnBoardHelper from "../../../helpers/Board/DeleteQuestOnBoard";
import getNewOrderHelper from "../../../helpers/Board/GetNewOrder";
import handleDragEnd from "../../../helpers/Board/HandleDragEnd";

const useQuestOperations = (context) => {
  const addNewQuestToBoard = (newQuest) => {
    addNewQuestToBoardHelper(newQuest, context);
  }

  const updateQuestToBoard = (updatedQuest) => {
    updateQuestToBoardHelper(updatedQuest, context);
  }

  const deleteQuestOnBoard = (deletedQuest) => {
    deleteQuestOnBoardHelper(deletedQuest, context);
  }

  const getNewOrder = (columnId) => {
    return getNewOrderHelper(columnId, context);
  }

  const onDragEnd = async (result) => {
    handleDragEnd(result, context);
  }

  return {
    addNewQuestToBoard,
    updateQuestToBoard,
    deleteQuestOnBoard,
    getNewOrder,
    onDragEnd
  };
};

export default useQuestOperations;
