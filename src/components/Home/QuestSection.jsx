import React, { memo, useCallback, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import BoardComponent from "./Board/BoardComponent";
import useFetchQuests from "../../hooks/Home/useFetchQuests";
import sendChangeStatusRequest from "../../requests/ChangeQuestStatus";
import usePagination from "../../hooks/Home/usePagination";
import transformQuests from "../../helpers/Home/TransformQuests";

const QuestSection = memo(() => {
  const { currentPage, handleNextPage, handlePrevPage } = usePagination();
  const { getPlayerInfo } = useContext(PlayerContext);
  const { data, error, isLoading, refetch } = useFetchQuests(currentPage);

  const changeTaskStatus = useCallback(async (taskId, newStatus) => {
    let success = await sendChangeStatusRequest(taskId, newStatus);
    if (success) {
      await getPlayerInfo(); 
      refetch({cancelRefetch:true});
    }
  },[getPlayerInfo]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const {
    quests,
    columns,
    columnOrder,
    prevOrds,
    nextOrds,
    pages
  } = transformQuests(data);

  const dataProps = {
    tasks: quests,
    columns: columns,
    columnOrder: columnOrder,
    prevOrds: prevOrds,
    nextOrds: nextOrds,
  };

  const paginationProps = {
    currentPage: currentPage,
    onNextPage: handleNextPage,
    onPrevPage: handlePrevPage,
    pages: pages,
  };

  const callbackProps = {
    changeTaskStatus: changeTaskStatus,
    refetch: refetch,
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
