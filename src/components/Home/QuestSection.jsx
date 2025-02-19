import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import BoardComponent from "./Board/BoardComponent";
import useFetchQuests from "../../hooks/Home/useFetchQuests";
import sendChangeStatusRequest from "../../requests/ChangeQuestStatus";
import usePagination from "../../hooks/Home/usePagination";
import transformQuests from "../../helpers/Home/TransformQuests";

const QuestSection = () => {
  const { currentPage, handleNextPage, handlePrevPage } = usePagination();
  const { getPlayerInfo } = useContext(PlayerContext);
  const { data, error, isLoading, isError, refetch } = useFetchQuests(currentPage);

  const changeTaskStatus = async (taskId, newStatus) => {
    let success = await sendChangeStatusRequest(taskId, newStatus);
    if (success) {
      await getPlayerInfo(); 
      refetch({cancelRefetch:true});
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  const transformData = transformQuests(data);

  const {
    quests,
    columns,
    columnOrder,
    prevOrds,
    nextOrds,
    pages
  } = transformData;

  
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
};

export default QuestSection;
