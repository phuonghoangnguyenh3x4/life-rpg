import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const useFetchQuests = (current_page) => {;
  const { checkAuthStatus } = useAuth();

  const fetchQuests = async (page) => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    //  const apiURL = "http://127.0.0.1:5000";

    try {
      console.log('apiURL', apiURL);
      const response = await axios.get(`${apiURL}/quest/get-quest`, {
        params: { page: page },
        withCredentials: true,
      });
      const data = response.data;
      console.log("data", data);
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

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["quests", current_page],
    queryFn: () => fetchQuests(current_page),
  });

  return { data, error, isLoading, isError, refetch };
};

export default useFetchQuests;
