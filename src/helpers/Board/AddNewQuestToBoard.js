const addNewQuestToBoard = (newQuest, context) => {
  const { refetch } = context.callbackProps;
  const data = context.data;
  const setData = context.setData;

  newQuest.id = `${newQuest.id}`;
  const col = data.columns[newQuest.status];
  const taskIds = col.taskIds;
  const newTaskIds = [newQuest.id, ...taskIds];
  const newColumn = {
    ...col,
    taskIds: newTaskIds,
  };

  const newTasks = {
    ...data.tasks,
    [newQuest.id]: newQuest,
  };

  const newState = {
    ...data,
    tasks: newTasks,
    columns: {
      ...data.columns,
      [newQuest.status]: newColumn,
    },
  };

  setData(newState);
  refetch({ cancelRefetch: true });
};

export default addNewQuestToBoard;
