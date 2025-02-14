import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const useFetchQuests = (current_page) => {;
  const { checkAuthStatus } = useAuth();

  const fetchQuests = async (page) => {
    const apiURL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${apiURL}/get-quest`, {
        params: { page: page },
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

  return { data, error, isLoading, refetch };
};

export default useFetchQuests;
