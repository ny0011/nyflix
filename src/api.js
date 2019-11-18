import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "d8dd14f32a0bf9331ea6812ba0b3a503",
    language: "en-US"
  }
});
api.get("tv/popular");

export default api;
