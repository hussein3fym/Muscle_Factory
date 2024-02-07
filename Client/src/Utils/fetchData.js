import axios from "axios";

export const exerciseOptions = {
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": "271a2a722dmsh3bc342da4e8daf0p140176jsn8ced400ce251",
  },
};

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url, exerciseOptions);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
