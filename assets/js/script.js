const apiKey = '93fef6dd8cdc0c39fb43fb5114f937ca'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherData(zipCode) {
  const url = `${apiUrl}?zip=${zipCode}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}


const searchForm = document.getElementById('zip-code-form');
const searchInput = document.getElementById('zip-code-input');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const zipCode = searchInput.value;
  if (zipCode) {
    const weatherData = await getWeatherData(zipCode);
    console.log(weatherData);
  } else {
    console.log('Please enter a zip code.');
  }
});