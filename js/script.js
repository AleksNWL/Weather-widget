const weatherInfo = document.querySelector('.weather-info');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const weatherImg = weatherInfo.querySelector('.weather-img');
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
  weatherTemp.textContent = `Температура воздуха: ${weather.hourly.temperature_2m[currentIndex]}`;
  weatherFeelTemp.textContent = `Ощущается как: ${weather.hourly.apparent_temperature[currentIndex]}`;
  weatherWind.textContent = weather.hourly.weathercode[currentIndex];

  switch(weather.hourly.weathercode[currentIndex]) {
    case(0):
      weatherImg.src = '../img/sun.svg';
      break;
    case(1):
      weatherImg.src = '../img/sun.svg';
      break;
    case(2):
      weatherImg.src = '../img/partly_cloudy.svg';
      break;
    case(3):
      weatherImg.src = '../img/cloudy.svg';
      break;
    case(45):
      weatherImg.src = '../img/sun.svg';
      break;
    case(48):
      weatherImg.src = '../img/sun.svg';
      break;
    case(51):
      weatherImg.src = '../img/sun.svg';
      break;
    case(53):
      weatherImg.src = '../img/sun.svg';
      break;
    case(55):
      weatherImg.src = '../img/sun.svg';
      break;
    case(56):
      weatherImg.src = '../img/sun.svg';
      break;
    case(57):
      weatherImg.src = '../img/sun.svg';
      break;
    case(61):
      weatherImg.src = '../img/sun.svg';
      break;
    case(63):
      weatherImg.src = '../img/sun.svg';
      break;
    case(65):
      weatherImg.src = '../img/sun.svg';
      break;
    case(66):
      weatherImg.src = '../img/sun.svg';
      break;
    case(67):
      weatherImg.src = '../img/sun.svg';
      break;
    case(71):
      weatherImg.src = '../img/sun.svg';
      break;
    case(73):
      weatherImg.src = '../img/sun.svg';
      break;
    case(75):
      weatherImg.src = '../img/sun.svg';
      break;
    case(77):
      weatherImg.src = '../img/sun.svg';
      break;
    case(80):
      weatherImg.src = '../img/sun.svg';
      break;
    case(81):
      weatherImg.src = '../img/sun.svg';
      break;
    case(82):
      weatherImg.src = '../img/sun.svg';
      break;
    case(85):
      weatherImg.src = '../img/sun.svg';
      break;
    case(86):
      weatherImg.src = '../img/sun.svg';
      break;
    case(95):
      weatherImg.src = '../img/sun.svg';
      break;
    case(96):
      weatherImg.src = '../img/sun.svg';
      break;
    case(99):
      weatherImg.src = '../img/sun.svg';
      break;
    default:
      console.log('Такой погоды пока что нет ;(');
  }
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