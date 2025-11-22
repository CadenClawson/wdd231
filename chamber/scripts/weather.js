const apiKey = "YOUR_API_KEY_HERE";
const city = "West Valley City";
const lat = 40.688; 
const lon = -112.001;

const currentTemp = document.querySelector("#current-temp");
const currentDesc = document.querySelector("#current-desc");
const forecastList = document.querySelector("#forecast-list");

async function getWeather() {
  try {
    // Fetch current weather
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();

    currentTemp.textContent = `${Math.round(weatherData.main.temp)}°F`;
    currentDesc.textContent = weatherData.weather[0].description;

    // Fetch forecast (3 days)
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();

    // Clear list
    forecastList.innerHTML = "";

    // Get one forecast per day (midday)
    const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    daily.forEach(day => {
      const li = document.createElement("li");
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });

      li.innerHTML = `<strong>${date}:</strong> ${Math.round(day.main.temp)}°F`;
      forecastList.appendChild(li);
    });

  } catch (error) {
    console.error("Weather fetch error:", error);
  }
}

getWeather();
