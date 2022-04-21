const express = require('express');
const apiWeather = require('./ApiWeather/ApiWeather');
const cors = require('cors');
const app = express();

const host = '127.0.0.1';
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

function getReq(sourceName, getWeatherFunc) {
    app.get(`/api/v1/${sourceName}/lat=:lat&lot=:lot`, async function (req, res) {
        console.log('Запрос от клиента:', req.url);
        //console.log('параметры запроса:', req.params);
        const content = {
            latitude: req.params.lat,
            longitude: req.params.lot
        };
        res.json(await getWeatherFunc(content));
    });
}

getReq('OpenWeather', apiWeather.getOpenWeather);

getReq('WeatherBit', apiWeather.getWeatherBit);

getReq('VisualcrossingWeather', apiWeather.getVisualcrossingWeather);

getReq('YandexWeather', apiWeather.getYandexWeather);

// app.get('/api/v1/OpenWeather/lat=:lat&lot=:lot', async function (req, res) {
//     console.log('Запрос от клиента:', req.url);
//     console.log('параметры запроса:', req.params);
//     const content = {
//         latitude: req.params.lat,
//         longitude: req.params.lot
//     };
//     res.send(await openWeather.getOpenWeather(content));
// });

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)

