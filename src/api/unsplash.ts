const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com";

export const fetchPhotos = async (page = 1, query = "") => {
  const response = await fetch(
    `${BASE_URL}/search/photos?query=${query || "random"}&page=${page}&per_page=20`,
    {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data;
};
