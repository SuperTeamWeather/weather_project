import {_apiKeyOpenWeather, _lang, _urlOpenWeather} from './Constant'

export const getOpenWeather = async (coordinates) => {
    if (coordinates) {
        return fetch(getUrlWeather(_urlOpenWeather, coordinates, _apiKeyOpenWeather))
            .then(response => response.json())
            .then(data => {
                    //console.log(data);
                    return data
                }
            )
    } else
        return 'Координаты отсутствуют'
}

const getUrlWeather = (name, coordinates, apiKey) => {
    return `${name}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&lang=${_lang}`
}


