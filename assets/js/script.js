const apiKey = '93fef6dd8cdc0c39fb43fb5114f937ca';

const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

async function getCurrentWeatherData(location) {
  const url = `${currentWeatherUrl}?q=${location}&appid=${apiKey}&units=imperial`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

async function getForecastData(lat, lon) {
  const url = `${forecastUrl}?q=${lat},${lon}&appid=${apiKey}&units=imperial`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayWeatherData(weatherData) {
  const name = document.getElementById('city-Name');
  const icon = document.getElementById('weather-icon');
  const weatherDisplay = document.getElementById('weather-display');

  icon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png")

  const cityName = weatherData.name;
  const iconData = weatherData.weather[0].icon;
  const temperatureFahrenheit = weatherData.main.temp;
  const description = weatherData.weather[0].description;

  weatherDisplay.innerHTML = ` ${temperatureFahrenheit} &deg;F<br> ${description}`;
  name.innerHTML = `${cityName}`;
  icon.innerHTML = `${iconData}`;
  console.log(iconData);
}

function displayForecastData(forecastData) {
  const forecastDisplays = document.getElementsByClassName('forecast-display');

  for (let i = 0; i < forecastDisplays.length; i++) {
    const forecast = forecastData.list[i];

    forecastDisplays[i].innerHTML = '';

    const date = document.createElement("h4");
    const name = document.createElement("h1");
    const temp = document.createElement("h3");
    const icon = document.createElement("img");
    const wind = document.createElement("p");

    const windSpeed = forecast.wind.speed;
    const windDeg = forecast.wind.deg;
     
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData.list[0].weather[0].icon + ".png")

    date.textContent = forecast.dt_txt;
    name.textContent = forecastData.city.name;
    temp.textContent = forecast.main.temp;
    wind.innerHTML = `wind: <br> ${windSpeed} <br> ${windDeg}&deg;`;

    forecastDisplays[i].appendChild(date);
    forecastDisplays[i].appendChild(name);
    forecastDisplays[i].appendChild(temp);
    forecastDisplays[i].appendChild(icon);
    forecastDisplays[i].appendChild(wind);
  }
  console.log(forecastData.list);
}

const searchForm = document.getElementById('zip-code');
const searchInput = document.getElementById('zip-code-input');
const locationList = document.getElementById('location-list');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = searchInput.value;

  const storedLocations = JSON.parse(localStorage.getItem('locations') || '[]');
  if (location && !storedLocations.includes(location)) {
    storedLocations.push(location);
    localStorage.setItem('locations', JSON.stringify(storedLocations));
  }

  locationList.innerHTML = '';
  for (const storedLocation of storedLocations) {
    const locationButton = document.createElement('button');
    locationButton.textContent = storedLocation;
    locationButton.addEventListener('click', async () => {
      const weatherData = await getCurrentWeatherData(storedLocation);
      console.log(weatherData);
      displayWeatherData(weatherData);

      const forecastData = await getForecastData(storedLocation);
      console.log(forecastData);
      displayForecastData(forecastData);
    });
    locationList.appendChild(locationButton);
  }


  if (location) {
    const weatherData = await getCurrentWeatherData(location);
    console.log(weatherData);
    displayWeatherData(weatherData);

    const forecastData = await getForecastData(location);
    console.log(forecastData);
    displayForecastData(forecastData);
      
  }

});

window.onload = () => {
  const storedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  
  storedLocations.forEach(async (location) => {
    const locationButton = document.createElement('button');
    locationButton.textContent = location;
    
    locationButton.addEventListener('click', async () => {
      const weatherData = await getCurrentWeatherData(location);
      console.log(weatherData);
      displayWeatherData(weatherData);
  
      const forecastData = await getForecastData(location);
      console.log(forecastData);
      displayForecastData(forecastData);
    });
    
    locationList.appendChild(locationButton);
  });
};
