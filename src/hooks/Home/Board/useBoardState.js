import { useState, useEffect } from "react";

const useBoardState = (dataProps, currentPage) => {
  const { tasks, columns, columnOrder } = dataProps;

  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

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
