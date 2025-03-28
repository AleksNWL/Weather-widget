import axios from "axios";


export const getWeatherData = async (cityData: any) => {
    const {latitude, longitude} = cityData;
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature,temperature_2m,weathercode&timezone=auto`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(`Ошибка: ${error}!`)
    }
}