import axios from "axios";

export const exerciseOptions = {
  method: "GET",
  params: { limit: "100" },
  headers: {
    "X-RapidAPI-Key": "27fce85f50msh2fce1c903cb66b8p10c486jsn5e3362720471",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};
/*e501584b90msh5e53ffaeebbf2f8p1de198jsne75024b02c3b */
/*27fce85f50msh2fce1c903cb66b8p10c486jsn5e3362720471 */
/*nour key 38dbb4693amshc13867d2b5aa7aep1ef4c0jsn63b92d2cd4a7*/
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": "271a2a722dmsh3bc342da4e8daf0p140176jsn8ced400ce251",
  },
};
export const foodDetails = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "",
    "X-RapidAPI-Key": "",
  },
};
export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

export const fetchCaloriesData = async (endpoint, options) => {
  const API_BASE_URL = "https://trackapi.nutritionix.com/v2";
  const defaultOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "959167a3",
      "x-app-key": "0f6562e017feab14efd373fc558cc70d",
    },
  };

  try {
    const response = await axios(`${API_BASE_URL}/${endpoint}`, defaultOptions);
    if (response.status === 404) {
      const jsonResponse = await response.data;
      throw new Error(jsonResponse.message);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
