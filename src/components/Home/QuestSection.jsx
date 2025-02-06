import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BoardComponent from "./QuestBoard/BoardComponent";
import { PlayerContext } from "../../context/PlayerContext";

const fetchQuests = async (current_page) => {
  const apiURL = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.get(`${apiURL}/get-quest`, {
      params: { page: current_page },
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
  const [current_page, setCurrentPage] = useState(1);
  const { getPlayerInfo } = useContext(PlayerContext);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["quests", current_page],
    queryFn: () => fetchQuests(current_page)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  data.quests.map((quest) => quest.id = `${quest.id}`)

  const quests = data.quests.reduce((acc, quest) => {
    acc[quest.id] = quest;
    return acc;
  }, {});

  const pages = data.pages;

  const columns = {
    "Todo": {
      id: "Todo",
      title: "To Do",
      taskIds: data.quests
        .filter((quest) => quest.status === "Todo")
        .map((quest) => quest.id),
    },
    "Doing": {
      id: "Doing",
      title: "Doing",
      taskIds: data.quests
        .filter((quest) => quest.status === "Doing")
        .map((quest) => quest.id),
    },
    "Done": {
      id: "Done",
      title: "Done",
      taskIds: data.quests
        .filter((quest) => quest.status === "Done")
        .map((quest) => quest.id),
    },
  };

  const columnOrder = ["Todo", "Doing", "Done"];

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    const apiURL = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("status", newStatus);

    try {
      const response = await axios.post(
        `${apiURL}/change-quest-status`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(response);
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      console.log(data);
      getPlayerInfo(); 
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

  return (
    <div className="quest-section">
      <BoardComponent
        tasks={quests}
        columns={columns}
        columnOrder={columnOrder}
        currentPage={current_page}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        pages={pages}
        changeTaskStatus={changeTaskStatus}
        prevOrds={data.prev_ord}
        nextOrds={data.next_ord}
      />
    </div>
  );
};

export default QuestSection;
