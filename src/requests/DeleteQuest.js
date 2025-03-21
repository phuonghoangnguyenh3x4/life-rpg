import axios from "axios";

const sendDeleteQuestRequest = async (questId) => {
  try {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const formData = new FormData();
    formData.append("id", questId);

    const response = await axios.post(`${apiURL}/quest/delete-quest`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    const data = response.data;
    console.log(response);
    if (response.status !== 200) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
};

export default sendDeleteQuestRequest;