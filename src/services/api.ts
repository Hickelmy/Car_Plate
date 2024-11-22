import axios from "axios";

const api = axios.create({
    baseURL: "https://car-api2.p.rapidapi.com",
    headers: {
      "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY || "7328babfb2msh9be852bbab94e7bp19d309jsn2e5d001e9cf2",
    },
  });
  
  export default api;
  