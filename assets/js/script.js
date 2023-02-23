const apiKey = '93fef6dd8cdc0c39fb43fb5114f937ca';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherData(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=imperial`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayWeatherData(weatherData) {
  const weatherDisplay = document.getElementById('weather-display');
  const temperatureFahrenheit = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  weatherDisplay.innerHTML = ` ${temperatureFahrenheit} &deg;F<br> ${description}`;
}

const searchForm = document.getElementById('zip-code');
const searchInput = document.getElementById('zip-code-input');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = searchInput.value;
  if (location) {
    const weatherData = await getWeatherData(location);
    displayWeatherData(weatherData);
  }
});
