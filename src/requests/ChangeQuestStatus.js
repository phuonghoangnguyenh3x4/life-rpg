import axios from "axios";

const sendChangeStatusRequest = async (taskId, newStatus) => {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  const formData = new FormData();
  formData.append("id", taskId);
  formData.append("status", newStatus);

  try {
    const response = await axios.post(
      `${apiURL}/quest/change-quest-status`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    const data = response.data;
    console.log(response);
    if (response.status !== 200) {
      throw new Error(data.error);
    }
    return true;
  } catch (error) {
    console.error(error.response.data);
    return false;
  }
};

export default sendChangeStatusRequest;
