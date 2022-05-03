const fs = require('fs');
const express = require('express');
const apiWeather = require('./ApiWeather/ApiWeather');
const cors = require('cors');
const https = require('https');
const app = express();

const host = '127.0.0.1';
const port = 7000;

const ENV = process.env.NODE_ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function getReq(sourceName, getWeatherFunc) {
    app.get(`/api/v1/${sourceName}/lat=:lat&lot=:lot`, async function (req, res) {

        if( ENV == 'production' ){
            console.log('ENV5', ENV);
            res.setHeader('Access-Control-Allow-Origin', 'https://superweather.site');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
        }
        
        console.log('Запрос от клиента:', req.url);        
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

if( ENV == 'production' ){
    
    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/superweather.site/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/superweather.site/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/superweather.site/chain.pem', 'utf8');    
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    const httpsServer = https.createServer(credentials, app); 
    httpsServer.listen(port, () => {
        console.log(`HTTPS Server listens ${port}`)
    });
} else {
    app.listen(port, host, () =>
        console.log(`Server listens http://${host}:${port}`)
    );
}



