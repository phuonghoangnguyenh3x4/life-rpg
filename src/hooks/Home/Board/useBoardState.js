import { useState, useEffect } from "react";
import transformQuests from "../../../helpers/Home/TransformQuests";

const useBoardState = (dataProps, currentPage, refetch) => {
  const { tasks, columns, columnOrder } = dataProps;

  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await refetch({cancelRefetch:true});
      const data = res.data;

      const {
        quests,
        columns,
        columnOrder      
      } = transformQuests(data);
    
      setData({
        tasks: quests,
        columns: columns,
        columnOrder: columnOrder,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    setData({
      tasks: tasks,
      columns: columns,
      columnOrder: columnOrder,
    });
  }, [currentPage]);

  return { data, setData };
};

export default useBoardState;
