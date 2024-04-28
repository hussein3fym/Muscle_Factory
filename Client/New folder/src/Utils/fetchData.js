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
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": "271a2a722dmsh3bc342da4e8daf0p140176jsn8ced400ce251",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
