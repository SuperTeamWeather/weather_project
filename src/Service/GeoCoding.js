import {_apiKeyOpenWeather, _urlOpenWeather} from "./Constant";

export const reverseGeoCodingOpenWeather = async (coordinates) => {
    return fetch(getUrlOpenWeatherReverse(_urlOpenWeather, coordinates, _apiKeyOpenWeather))
        .then(response => response.json())
        .then(data => data[0])
}

const getUrlOpenWeatherReverse = (name, coordinates, apiKey) => {
    return `${name}/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`
}
