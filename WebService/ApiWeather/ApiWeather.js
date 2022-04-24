const _urlOpenWeather = 'https://api.openweathermap.org';
const _apiKeyOpenWeather = '06f902b2237e5817af2494e552d5c471';

const _urlWeatherBit = 'https://api.weatherbit.io';
const _apiKeyWeatherBit = '8349f39dbf3441b18f0c0c37d2d9113a';

const _urlVisualcrossingWeather = 'https://weather.visualcrossing.com';
const _apiKeyVisualcrossingWeather = '37ZJGF2UWPULHEVHU6S9EFXCJ';

const _urlYandexWeather = 'https://api.weather.yandex.ru';
const _apiKeyYandexWeather = 'b7ab09cb-cfaf-484d-bf9f-820c9bf9b192';

const _lang = 'ru'
const fetchNode = require('node-fetch');

// OpenWeatherMap source
exports.getOpenWeather = function async(coordinates) {
    if (coordinates) {
        return fetchNode(getUrlWeather(_urlOpenWeather, coordinates, _apiKeyOpenWeather))
            .then(response => response.json())
            .then(data => {
                //console.log(`Ответ: ${JSON.stringify(data)}`);
                return data
            }
            )
    } else
        return 'Координаты отсутствуют'
}

const getUrlWeather = (name, coordinates, apiKey) => {
    console.log(`Запрос к стороннему сервису ${name}/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,alerts&appid=${apiKey}&lang=${_lang}&units=metric`)
    return `${name}/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,alerts&appid=${apiKey}&lang=${_lang}&units=metric`
}

// WeatherBit source
exports.getWeatherBit = function async(coordinates) {
    if (coordinates) {
        return fetchNode(getUrlWeatherBit(_urlWeatherBit, coordinates, _apiKeyWeatherBit))
            .then(response => response.json())
            .then(data => {
                //console.log(`Ответ: ${JSON.stringify(data)}`);
                return data
            }
            )
    } else
        return 'Координаты отсутствуют'
}

const getUrlWeatherBit = (name, coordinates, apiKey) => {
    console.log(`Запрос к стороннему сервису ${name}/v2.0/current?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&lang=${_lang}`)
    return `${name}/v2.0/current?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&lang=${_lang}`
}

// Visual crossing source
exports.getVisualcrossingWeather = function async(coordinates) {
    if (coordinates) {
        return fetchNode(getUrlVisualcrossingWeather(_urlVisualcrossingWeather, coordinates, _apiKeyVisualcrossingWeather))
            .then(response => response.json())
            .then(data => {
                // console.log(`Ответ: ${JSON.stringify(data)}`);
                return data
            }
            )
    } else
        return 'Координаты отсутствуют'
}

const getUrlVisualcrossingWeather = (name, coordinates, apiKey) => {
    console.log(`Запрос к стороннему сервису ${name}/VisualCrossingWebServices/rest/services/timeline/${coordinates.latitude}%2C${coordinates.longitude}/next7days?unitGroup=metric&include=current%2Cdays%2Chours&key=${apiKey}&contentType=json`)
    return `${name}/VisualCrossingWebServices/rest/services/timeline/${coordinates.latitude}%2C${coordinates.longitude}/next7days?unitGroup=metric&include=current%2Cdays%2Chours&key=${apiKey}&contentType=json`
}

// Yandex source
exports.getYandexWeather = function async(coordinates) {
    if (coordinates) {
        return fetchNode(getUrlYandexWeather(_urlYandexWeather, coordinates), {
            method: "GET",
            headers: {
                "X-Yandex-API-Key": _apiKeyYandexWeather
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log(`Ответ: ${JSON.stringify(data)}`);
                return data
            }
            )
    } else
        return 'Координаты отсутствуют'
}

const getUrlYandexWeather = (name, coordinates) => {
    console.log(`Запрос к стороннему сервису ${name}/v2/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}`)
    return `${name}/v2/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}`
}
