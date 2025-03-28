import axios from 'axios'


export const weatherCity = async (city: string) => {
    if (!city) {
        console.log("Пустое значение в поле ввода.");
        return;
    }
    try {
        const response = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
        );
        if (response.data.results.length > 0) {
            console.log("Город найден.")
            return response.data.results[0];
        } else {
            console.log("Такого города нет.")
        }
    } catch (error) {
        console.log(`Ошибка: ${error}!`)
    }
}