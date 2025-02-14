const transformQuests = (data) => {
  const quests = data.quests.reduce((acc, quest) => {
    quest.id = `${quest.id}`;
    acc[quest.id] = quest;
    return acc;
  }, {});

  const columns = {
    Todo: {
      id: "Todo",
      title: "To Do",
      taskIds: data.quests
        .filter((quest) => quest.status === "Todo")
        .map((quest) => quest.id),
    },
    Doing: {
      id: "Doing",
      title: "Doing",
      taskIds: data.quests
        .filter((quest) => quest.status === "Doing")
        .map((quest) => quest.id),
    },
    Done: {
      id: "Done",
      title: "Done",
      taskIds: data.quests
        .filter((quest) => quest.status === "Done")
        .map((quest) => quest.id),
    },
  };

  return {
    quests,
    columns,
    columnOrder: ["Todo", "Doing", "Done"],
    prevOrds: data.prev_ord,
    nextOrds: data.next_ord,
    pages: data.pages,
  };
};

export default transformQuests;
