import axios from "axios";

const POST_API = async ({ url, data }) => {
  try {
    const response = await axios({
      url: url,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error("API Error:", url, error);
  }
};

export default POST_API;
