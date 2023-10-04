export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7942e688e5mshdd476d6c864e145p1404e9jsne045e5f44686",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7942e688e5mshdd476d6c864e145p1404e9jsne045e5f44686",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
