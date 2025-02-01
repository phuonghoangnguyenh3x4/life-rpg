import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BoardComponent from "./QuestBoard/BoardComponent";

const fetchQuests = async () => {
  const apiURL = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.get(`${apiURL}/get-quest`, {
      withCredentials: true,
    });
    const data = response.data;
    if (response.status !== 200) {
      console.log("data.error", data.error);
      throw new Error(data.error);
    }
    console.log("data", data);
    return data;
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.response.data);
  }
};

const QuestSection = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  data.map((quest) => quest.id = `${quest.id}`)

  const quests = data.reduce((acc, quest) => {
    acc[quest.id] = quest;
    return acc;
  }, {});

  const columns = {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: data
        .filter((quest) => quest.status === "Todo")
        .map((quest) => quest.id),
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: data
        .filter((quest) => quest.status === "Doing")
        .map((quest) => quest.id),
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: data
        .filter((quest) => quest.status === "Done")
        .map((quest) => quest.id),
    },
  };

  const columnOrder = ["column-1", "column-2", "column-3"];

  return (
    <div className="quest-section">
      <BoardComponent
        tasks={quests}
        columns={columns}
        columnOrder={columnOrder}
      />
    </div>
  );
};

export default QuestSection;
