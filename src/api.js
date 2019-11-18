import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "d8dd14f32a0bf9331ea6812ba0b3a503",
    language: "en-US"
  }
});

// Readme.md에서 API verbs 작성한 내역을 모두 쓸 것임.
export const moviesApi = {
  nowPlaying: () => api.get("/movie/now_playing"),
  upcoming: () => api.get("/movie/upcoming"),
  popular: () => api.get("/movie/popular")
};

export const tvApi = {
  topRated: () => api.get("/tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("/tv/airing_today")
};
