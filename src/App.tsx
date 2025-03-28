import './App.css';
import {weatherCity} from "./services/weather-city-api.ts";
import { useState } from 'react';
import {getWeatherData} from "./services/weather-api.ts";


function App() {
    const [city, setCity] = useState<string>('');
    const [weatherInfo, setWeatherInfo] = useState<any>(null);
    const [weatherImg, setWeatherImg] = useState<string>('');
    const [temp, setTemp] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }

    const handleClick = async () => {
        try {
            const cityData = await weatherCity(city);
            console.log(cityData);
            if (cityData) {
                const weatherData = await getWeatherData(cityData);
                setWeatherInfo(weatherData);
                setTimeCity(weatherData);
                console.log(weatherData.hourly.temperature_2m);
            }
        } catch (error) {
            console.error(`Ошибка какой-то из API: ${error}!`);
        }
    }

    const setTimeCity = (weatherData) => {
        console.log(weatherData.current_weather.time)
        getWeatherIcon(weatherData.hourly.weathercode[0]);
    }

    function getWeatherIcon(code: number): string | undefined {
        const weatherIcons: {[key: number]: string} = {
            0: '../img/weatherIcons/sun.svg',
            1: '../img/weatherIcons/mainly_clear.svg',
            2: '../img/weatherIcons/partly_cloudy.svg',
            3: '../img/weatherIcons/overcast.svg',
            45: '../img/weatherIcons/fog.svg',
            48: '../img/weatherIcons/fog.svg',
            51: '../img/weatherIcons/drizzle_light.svg',
            53: '../img/weatherIcons/drizzle_moderate.svg',
            55: '../img/weatherIcons/drizzle_dense_intensity.svg',
            56: '../img/weatherIcons/freezing_drizzle.svg',
            57: '../img/weatherIcons/freezing_drizzle.svg',
            61: '../img/weatherIcons/rain_slight.svg',
            63: '../img/weatherIcons/rain_moderate.svg',
            65: '../img/weatherIcons/rain_heavy_intensity.svg',
            66: '../img/weatherIcons/freezing_rain.svg',
            67: '../img/weatherIcons/freezing_rain.svg',
            71: '../img/weatherIcons/snow_fall_slight.svg',
            73: '../img/weatherIcons/snow_fall_moderate.svg',
            75: '../img/weatherIcons/snow_fall_heavy_intensity.svg',
            77: '../img/weatherIcons/snow_fall_heavy_intensity.svg',
            80: '../img/weatherIcons/rain_slight.svg',
            81: '../img/weatherIcons/rain_moderate.svg',
            82: '../img/weatherIcons/rain_heavy_intensity.svg',
            85: '../img/weatherIcons/snow_fall_moderate.svg',
            86: '../img/weatherIcons/snow_fall_heavy_intensity.svg',
            95: '../img/weatherIcons/thunderstorm.svg',
            96: '../img/weatherIcons/thunderstorm_hail.svg',
            99: '../img/weatherIcons/thunderstorm_hail.svg'
        };

        const icon: string = weatherIcons[code];
        if (icon) {
            setWeatherImg(icon);
            return;
        }
        console.log('Нет, такой погоды!')
    }

  return (
    <>
        <div className="weather-wighet">
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                className="search-input"
                placeholder="Введите город..."
            />
            <button
                onClick={handleClick}
                className="search-button">Вжух!</button>
            <div className="weather-info">
                <img
                    src={weatherImg}
                    alt="Weather"/>
                <div className="weather-city">{city}</div>
                <div className="weather-feel-temp"></div>
                <div className="weather-wind"></div>
                <div className="weather-wet"></div>
            </div>
            <div className="loading-spinner"></div>
            <div className="error-message"></div>
        </div>
    </>
  )
}

export default App
