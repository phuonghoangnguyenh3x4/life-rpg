const updateQuestToBoard = (updatedQuest, context) => {
  const { refetch } = context.callbackProps;
  const data = context.data;
  const setData = context.setData;

  updatedQuest.id = `${updatedQuest.id}`;

  const newTasks = {
    ...data.tasks,
    [updatedQuest.id]: updatedQuest,
  };

  const newState = {
    ...data,
    tasks: newTasks,
  };

  setData(newState);
  refetch({ cancelRefetch: true });
};

export default updateQuestToBoard;
