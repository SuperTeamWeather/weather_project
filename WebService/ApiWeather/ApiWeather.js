const _urlOpenWeather = 'https://api.openweathermap.org';
const _apiKeyOpenWeather = '06f902b2237e5817af2494e552d5c471';
const _lang = 'ru'
const fetchNode = require('node-fetch');

exports.getOpenWeather = function async (coordinates) {
    if (coordinates) {
        return fetchNode(getUrlWeather(_urlOpenWeather, coordinates, _apiKeyOpenWeather))
            .then(response => response.json())
            .then(data => {
                    console.log(`Ответ: ${JSON.stringify(data)}`);
                    return data
                }
            )
    } else
        return 'Координаты отсутствуют'
}

const getUrlWeather = (name, coordinates, apiKey) => {
    console.log(`Запрос к стороннему сервису ${name}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&lang=${_lang}`)
    return `${name}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&lang=${_lang}`
}
