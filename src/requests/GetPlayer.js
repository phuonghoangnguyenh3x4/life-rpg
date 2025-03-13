import axios from "axios";

const sendGetPlayerRequest = async () => {
  try {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${apiURL}/player/get-player`, {
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
    return null;
  }
};

export default sendGetPlayerRequest;
