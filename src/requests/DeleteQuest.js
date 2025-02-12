import axios from "axios";

const sendDeleteQuestRequest = async (questId) => {
  try {
    const apiURL = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    formData.append("id", questId);

    const response = await axios.post(`${apiURL}/delete-quest`, formData, {
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