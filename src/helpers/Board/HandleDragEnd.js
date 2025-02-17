import calculateTaskOrder from "./CalculateTaskOrder";
import sendChangeOrderRequest from "../../requests/ChangeQuestOrder";

const handleDragEnd = async (
  result,
  context
) => {
  const { destination, source, draggableId } = result;
  const { prevOrds, nextOrds } = context.dataProps;
  const { changeTaskStatus, refetch } = context.callbackProps;
  const data = context.data;
  const setData = context.setData;

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
    refetch({ cancelRefetch: true });
    let updatedTask = newState.tasks[questId];
    updatedTask['ord'] = newOrd.toString();

    setData({
      ...newState,
      tasks: {
        ...newState.tasks,
        [taskIndex]: updatedTask,
      },
    });
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

    setData(newState);
    changeTaskOrder(newState);
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

export default handleDragEnd;
