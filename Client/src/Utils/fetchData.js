export const exerciseOptions = {
  method: "GET",
  params: { limit: "10" },
  headers: {
    "X-RapidAPI-Key": "e501584b90msh5e53ffaeebbf2f8p1de198jsne75024b02c3b",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
