const express = require('express');
const openWeather = require('./ApiWeather/ApiWeather');
const cors = require('cors');
const app = express();

const host = '127.0.0.1';
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/api/v1/OpenWeather/lat=:lat&lot=:lot', async function (req, res) {
    console.log('Запрос от клиента:', req.url);
    console.log('параметры запроса:', req.params);
    const content = {
        latitude: req.params.lat,
        longitude: req.params.lot
    };
    res.send(await openWeather.getOpenWeather(content));
});

app.get('/api/v1/WeatherBit/lat=:lat&lot=:lot', async function (req, res) {
    console.log('Запрос от клиента:', req.url);
    console.log('параметры запроса:', req.params);
    const content = {
        latitude: req.params.lat,
        longitude: req.params.lot
    };
    res.send(await openWeather.getWeatherBit(content));
});

app.get('/api/v1/VisualcrossingWeather/lat=:lat&lot=:lot', async function (req, res) {
    console.log('Запрос от клиента:', req.url);
    console.log('параметры запроса:', req.params);
    const content = {
        latitude: req.params.lat,
        longitude: req.params.lot
    };
    res.send(await openWeather.getVisualcrossingWeather(content));
});

app.get('/api/v1/YandexWeather/lat=:lat&lot=:lot', async function (req, res) {
    console.log('Запрос от клиента:', req.url);
    console.log('параметры запроса:', req.params);
    const content = {
        latitude: req.params.lat,
        longitude: req.params.lot
    };
    res.send(await openWeather.getYandexWeather(content));
});

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)

