import axios from "axios";

const sendLogOutRequest = async () => {
  const apiURL = import.meta.env.VITE_APP_API_URL;
  try {
    let response = await axios.post(
      `${apiURL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    const data = response.data;
    if (response.status !== 200) {
      throw new Error(data.error);
    }
    console.log("logout successfully");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};

export default sendLogOutRequest;
