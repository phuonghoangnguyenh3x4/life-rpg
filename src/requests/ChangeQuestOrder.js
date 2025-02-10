import axios from "axios";

const sendChangeOrderRequest = async (questId, newOrd) => {
    const apiURL = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    formData.append("id", questId);
    formData.append("ord", newOrd);
    try {
      const response = await axios.post(
        `${apiURL}/change-quest-ord`,
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
      console.log(data);
      return true;
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };

export default sendChangeOrderRequest;