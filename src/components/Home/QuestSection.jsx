import React, { useState, useContext, useCallback, memo  } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BoardComponent from "./QuestBoard/BoardComponent";
import { PlayerContext } from "../../context/PlayerContext";
import { useAuth } from "../../context/AuthContext";

const QuestSection = memo(() => {
  const [current_page, setCurrentPage] = useState(1);
  const { getPlayerInfo } = useContext(PlayerContext);
  const { checkAuthStatus } = useAuth();

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
      return data;
    } catch (error) {
      console.error(error.response.data);
      if (error.response.status === 401) {
        checkAuthStatus();
      }
      throw new Error(error.response.data);
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["quests", current_page],
    queryFn: () => fetchQuests(current_page),
    staleTime: 0,
    cacheTime: 0
  });

  const changeTaskStatus = useCallback(async (taskId, newStatus) => {
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
      await getPlayerInfo(); 
      refetch({cancelRefetch:true});
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  },[getPlayerInfo]);

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

  const dataProps = {
    tasks: quests,
    columns: columns,
    columnOrder: columnOrder,
    prevOrds:data.prev_ord,
    nextOrds:data.next_ord
  };

  const paginationProps = {
    currentPage:current_page,
    onNextPage:handleNextPage,
    onPrevPage:handlePrevPage,
    pages:pages
  };

  const callbackProps = {
    changeTaskStatus:changeTaskStatus,
    refetch:refetch
  };

  return (
    <div className="quest-section">
      <BoardComponent
        dataProps={dataProps}
        paginationProps={paginationProps}
        callbackProps={callbackProps}
      />
    </div>
  );
});

export default QuestSection;
