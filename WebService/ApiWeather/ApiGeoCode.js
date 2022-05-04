const fetchNode = require("node-fetch");
const _apiKeyYandexGeoCode = '4de7ea0f-368d-482b-8b18-f10e10af13c4'
const _urlYandexGeoCode = 'https://geocode-maps.yandex.ru';
exports.getGeoCoding = function async (paramSearch) {
    if (paramSearch) {
        return fetchNode(`${_urlYandexGeoCode}/1.x/?apikey=${_apiKeyYandexGeoCode}&format=json&geocode=${paramSearch}`)
            .then(response => response.json())
            .then(data => {
                //console.log(`Ответ: ${JSON.stringify(data)}`);
                return data
            })
    } else
        return 'Параметры поиска не заданны'
}
