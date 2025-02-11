import { LexoRank } from "lexorank";

const getNewOrder = (columnId, context) => {
  const { tasks, columns, prevOrds } = context.dataProps;
  let prevOrd = prevOrds[columnId];
  let taskIds = columns[columnId].taskIds;
  let firstTaskId = taskIds.length === 0 ? null : taskIds[0];

  let firstTaskOrd = firstTaskId ? tasks[firstTaskId]["ord"] : null;
  if (prevOrd === null && firstTaskOrd == null) {
    return LexoRank.min().genNext();
  }
  if (prevOrd === null) {
    return LexoRank.parse(firstTaskOrd).genNext();
  }
  if (firstTaskOrd === null) {
    return LexoRank.parse(prevOrd).between(LexoRank.min());
  }
  prevOrd = LexoRank.parse(prevOrd);
  firstTaskOrd = LexoRank.parse(firstTaskOrd);
  return firstTaskOrd.between(prevOrd);
};

export default getNewOrder;
