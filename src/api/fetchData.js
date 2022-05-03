import axios from "axios";

const fetchData = async (token) => {
  let result;
  const url =
    "https://stage-services.truemeds.in/ArticleService/getArticleListing";

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    result = await axios.post(url, config);
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default fetchData;
