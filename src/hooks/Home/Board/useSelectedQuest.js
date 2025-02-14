import { useState, useCallback } from "react";
import $ from 'jquery';

const useSelectedQuest = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const onTaskClick = useCallback((task) => {
    setSelectedQuest(task);
    $("#editQuestModal").show();
  }, []);

  return { selectedQuest, onTaskClick };
};

export default useSelectedQuest;
