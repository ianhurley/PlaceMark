import dotenv from "dotenv";

dotenv.config();

const lat = document.getElementById("latitude").textContent;
const lon = document.getElementById("longitude").textContent;
const apiKey = process.env.WEATHER_KEY;
const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

fetch(apiurl)
  .then(response => response.json())
  .then(data => {
    const weatherDiv = document.getElementById("weather");
    const temp = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const weatherHtml = `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${description}"> ${temp}°C, ${description}`;
    weatherDiv.innerHTML = weatherHtml;
  })
  .catch(error => {
    console.error("Error:", error);
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = "Error fetching weather data";
  });

  