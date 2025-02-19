import axios from "axios";

const sendUpdateQuestRequest = async (formData) => {
  try {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const response = await axios.post(`${apiURL}/quest/update-quest`, formData, {
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

export default sendUpdateQuestRequest;

