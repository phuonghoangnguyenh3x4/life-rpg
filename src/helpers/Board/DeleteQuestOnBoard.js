import cloneObject from "../CloneObject";

const deleteQuestOnBoard = (deletedQuest, context) => {
  const { refetch } = context.callbackProps;
  const data = context.data;
  const setData = context.setData;

  deletedQuest.id = `${deletedQuest.id}`;

  const col = data.columns[deletedQuest.status];
  const taskIds = col.taskIds;
  const newTaskIds = taskIds.slice();
  newTaskIds.splice(taskIds.indexOf(deletedQuest.id), 1);

  const newColumn = {
    ...col,
    taskIds: newTaskIds,
  };

  const newTasks = cloneObject(data.tasks);
  delete newTasks[deletedQuest.id];

  const newState = {
    ...data,
    tasks: newTasks,
    columns: {
      ...data.columns,
      [deletedQuest.status]: newColumn,
    },
  };

  setData(newState);
  refetch({ cancelRefetch: true });
};

export default deleteQuestOnBoard;
