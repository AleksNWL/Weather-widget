export function getWeatherIcon(code: number): string | undefined {
    const weatherIcons: {[key: number]: string} = {
        0: '../public/img/weatherIcons/sun.svg',
        1: '../public/img/weatherIcons/mainly_clear.svg',
        2: '../public/img/weatherIcons/partly_cloudy.svg',
        3: '../public/img/weatherIcons/overcast.svg',
        45: '../public/img/weatherIcons/fog.svg',
        48: '../public/img/weatherIcons/fog.svg',
        51: '../public/img/weatherIcons/drizzle_light.svg',
        53: '../public/img/weatherIcons/drizzle_moderate.svg',
        55: '../public/img/weatherIcons/drizzle_dense_intensity.svg',
        56: '../public/img/weatherIcons/freezing_drizzle.svg',
        57: '../public/img/weatherIcons/freezing_drizzle.svg',
        61: '../public/img/weatherIcons/rain_slight.svg',
        63: '../public/img/weatherIcons/rain_moderate.svg',
        65: '../public/img/weatherIcons/rain_heavy_intensity.svg',
        66: '../public/img/weatherIcons/freezing_rain.svg',
        67: '../public/img/weatherIcons/freezing_rain.svg',
        71: '../public/img/weatherIcons/snow_fall_slight.svg',
        73: '../public/img/weatherIcons/snow_fall_moderate.svg',
        75: '../public/img/weatherIcons/snow_fall_heavy_intensity.svg',
        77: '../public/img/weatherIcons/snow_fall_heavy_intensity.svg',
        80: '../public/img/weatherIcons/rain_slight.svg',
        81: '../public/img/weatherIcons/rain_moderate.svg',
        82: '../public/img/weatherIcons/rain_heavy_intensity.svg',
        85: '../public/img/weatherIcons/snow_fall_moderate.svg',
        86: '../public/img/weatherIcons/snow_fall_heavy_intensity.svg',
        95: '../public/img/weatherIcons/thunderstorm.svg',
        96: '../public/img/weatherIcons/thunderstorm_hail.svg',
        99: '../public/img/weatherIcons/thunderstorm_hail.svg'
    };

    const icon: string = weatherIcons[code];
    if (icon) {
        return icon;
    }
    console.log('Нет, такой погоды!')
}