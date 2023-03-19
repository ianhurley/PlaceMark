/* import dotenv from "dotenv";

dotenv.config();

const fetchWeather = (lat, lon) => {
  const apikey = process.env.OPENWEATHER_API_KEY;
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
  return fetch(apiurl).then(response => response.json());
};

export { fetchWeather }; */