const weatherInfo = document.querySelector('.weather-info');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const weatherCity = weatherInfo.querySelector('.weather-city');
const weatherTemp = weatherInfo.querySelector('.weather-temperature');
const weatherFeelTemp = weatherInfo.querySelector('.weather-feel-temp');
const weatherWind = weatherInfo.querySelector('.weather-wind');
const weatherWet = weatherInfo.querySelector('.weather-wet');

async function getCoordinates(city) {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    const data = await response.json();
    console.log(data);
    return data.results[0];
}

async function getWeather(latitude, longitude) {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature,temperature_2m,weathercode&timezone=auto`
    );
    return await response.json();
}

async function showWeather(city) {
  const coordinates = await getCoordinates(city);
  console.log(coordinates);
  weatherCity.textContent = coordinates.name;
  const weather = await getWeather(coordinates.latitude, coordinates.longitude);
  console.log(weather)
  let time = formatTime(weather.current_weather.time);
  const currentIndex = weather.hourly.time.findIndex(times => times === time);
  weatherTemp.textContent = `Температура воздуха: ${Math.round(weather.hourly.temperature_2m[currentIndex])}°C`;
  weatherFeelTemp.textContent = `Ощущается как: ${Math.round(weather.hourly.apparent_temperature[currentIndex])}°C`;
  
  const existingImg = weatherInfo.querySelector('img');
  if (existingImg) {
    existingImg.remove();
  }

  const imgElement = document.createElement('img');
  imgElement.alt = "weather-image";
  imgElement.src = getWeatherIcon(weather.hourly.weathercode[currentIndex]);
  imgElement.width = "80";

  weatherInfo.insertBefore(imgElement, weatherInfo.firstChild)
}

function getWeatherIcon(code) {
  const weatherIcons = {
    0: './img/sun.svg',
    1: './img/mainly_clear.svg',
    2: './img/partly_cloudy.svg',
    3: './img/overcast.svg',
    45: './img/fog.svg',
    48: './img/fog.svg',
    51: './img/drizzle_light.svg',
    53: './img/drizzle_moderate.svg',
    55: './img/drizzle_dense_intensity.svg',
    56: './img/freezing_drizzle.svg',
    57: './img/freezing_drizzle.svg',
    61: './img/rain_slight.svg',
    63: './img/rain_moderate.svg',
    65: './img/rain_heavy_intensity.svg',
    66: './img/freezing_rain.svg',
    67: './img/freezing_rain.svg',
    71: './img/snow_fall_slight.svg',
    73: './img/snow_fall_moderate.svg',
    75: './img/snow_fall_heavy_intensity.svg',
    77: './img/snow_fall_heavy_intensity.svg',
    80: './img/rain_slight.svg',
    81: './img/rain_moderate.svg',
    82: './img/rain_heavy_intensity.svg',
    85: './img/snow_fall_moderate.svg',
    86: './img/snow_fall_heavy_intensity.svg',
    95: './img/thunderstorm.svg',
    96: './img/thunderstorm_hail.svg',
    99: './img/thunderstorm_hail.svg'
  };
  return weatherIcons[code] || console.log('Такой погоды пока что нет ;(');
}

function formatTime(currentTime) {
  let [datePart, timePart] = currentTime.split('T');
  let [hoursStr, minutesStr] = timePart.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (minutes >= 30) {
    hours += 1;
  }

  if (hours >= 24) {
    hours -= 24;
    const date = new Date(`${datePart}T00:00`);
    date.setUTCDate(date.getUTCDate() + 1);
    datePart = date.toISOString().split('T')[0];
  }

  const formattedHours = String(hours).padStart(2, '0');
  console.log(`${datePart}T${formattedHours}:00`)
  return `${datePart}T${formattedHours}:00`;
}

function search() {
  const city = searchInput.value.trim();
  if (city) showWeather(city);
}

searchButton.addEventListener('click', search);

searchInput.addEventListener('keydown', (event) => {
  if (event.code == 'Enter') {
    search()
  };
});
