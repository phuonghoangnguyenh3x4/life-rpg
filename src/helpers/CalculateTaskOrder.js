import { LexoRank } from "lexorank";

const calculateTaskOrder = (
      newState,
      columnName,
      destinationCol,
      taskIndex,
      prevOrds,
      nextOrds
    ) => {
      if (taskIndex === 0 && taskIndex === destinationCol.taskIds.length - 1) {
        if (prevOrds[columnName] === null) {
          return LexoRank.min().genNext();
        }
        let prevOrd = LexoRank.parse(prevOrds[columnName]);
        let nextOrd = LexoRank.min();
        let newOrd = prevOrd.between(nextOrd);
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
        let newOrd = prevOrd.between(nextOrd);
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

export default calculateTaskOrder;