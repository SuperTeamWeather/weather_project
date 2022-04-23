import {
    _urlOpenWeather,
    _urlYandex,
    _urlWeatherBit,
    _urlVisualWeather
} from "./Constant"
import { WeatherData, WeatherDataHourly } from "./classWeatherData"
import { getWindDirText,
    getWindDirTextYandex,
    getRusWeatherConditionYandex,
    getRusWeatherConditionVisualcrossing } from "./tools"
import { getNameWeatherFromRegExp } from "./tools"


export const getUnitedWeatherData = (data, apiName) => {

    switch (apiName) {
        case _urlOpenWeather:
            const openWeather = {}
            const openWeatherHourly = []

            openWeather[getNameWeatherFromRegExp(apiName)] = new WeatherData(
                data.timezone,
                data.current.temp,
                data.current.feels_like,
                data.current.weather[0].description.charAt(0).toUpperCase() + data.current.weather[0].description.slice(1),
                data.current.wind_speed.toFixed(1),
                getWindDirText(data.current.wind_deg),
                Math.round(data.current.humidity),
                Math.round(data.current.pressure * 0.75),
                data.current.weather[0].icon,
                Math.round(data.daily[0].temp.min),
                Math.round(data.daily[0].temp.max)
            )

            const openWeatherHoursArray = data.hourly;
            openWeatherHoursArray.forEach((el, idx) => {
                if (idx < 24) {
                    let dataHour = new WeatherDataHourly(
                        new Date(el.dt * 1000).getHours(), // здесь и далее преобразование Timestamp в значение часа
                        el.temp,
                        el.weather[0].icon // либо заменить на "el.weather[0].description" если нужно описание
                    )
                    openWeatherHourly.push(dataHour);
                }
            });

            console.log("openWeatherHourly ", openWeatherHourly) 
            console.log(data.daily[0].temp.min, data.daily[0].temp.max);
            return openWeather // возвращать массив или объект из двух переменных openWeather и openWeatherHourly, применить ко всем источникам

        case _urlYandex:
            const yandex = {}
            const yandexHourly = []

            yandex[getNameWeatherFromRegExp(apiName)] = new WeatherData(
                data.geo_object.locality.name,
                data.fact.temp,
                data.fact.feels_like,
                getRusWeatherConditionYandex(data.fact.condition),
                data.fact.wind_speed.toFixed(1),
                getWindDirTextYandex(data.fact.wind_dir),
                Math.round(data.fact.humidity),
                data.fact.pressure_mm,
                data.fact.icon,
                Math.round(data.forecasts[0].parts.day_short.temp_min),
                Math.round(data.forecasts[0].parts.day_short.temp)
            )
            
            const yandexHoursArray = data.forecasts[0].hours;
            yandexHoursArray.forEach(el => {
                let dataHour = new WeatherDataHourly(
                    new Date(el.hour_ts * 1000).getHours(),
                    el.temp,
                    el.icon // либо заменить на "getRusWeatherConditionYandex(el.condition)" если нужно описание
                )
                yandexHourly.push(dataHour);
            });

            console.log("yandexHourly ", yandexHourly);
            console.log(data.forecasts[0].parts.day_short.temp_min, data.forecasts[0].parts.day_short.temp);
            return yandex

        case _urlWeatherBit:
            const weatherBit = {}
            const weatherBitHourly = []

            weatherBit[getNameWeatherFromRegExp(apiName)] = new WeatherData(
                data.data[0].city_name,
                data.data[0].temp,
                data.data[0].app_temp,
                data.data[0].weather.description,
                data.data[0].wind_spd.toFixed(1),
                data.data[0].wind_cdir,
                Math.round(data.data[0].rh),
                Math.round(data.data[0].pres * 0.75),
                data.data[0].weather.icon,
                null,
                null
            )
            return weatherBit

        case _urlVisualWeather:
            const visualWeather = {}
            const visualWeatherHourly = []

            visualWeather[getNameWeatherFromRegExp(apiName)] = new WeatherData(
                data.timezone,
                data.currentConditions.temp,
                data.currentConditions.feelslike,
                getRusWeatherConditionVisualcrossing(data.currentConditions.conditions),
                data.currentConditions.windspeed.toFixed(1),
                getWindDirText(data.currentConditions.winddir),
                Math.round(data.currentConditions.humidity),
                Math.round(data.currentConditions.pressure * 0.75),
                data.currentConditions.icon,
                Math.round(data.days[0].tempmin),
                Math.round(data.days[0].tempmax)
            )

            const visualWeatherHoursArray = data.days[0].hours;
            visualWeatherHoursArray.forEach(el => {
                let dataHour = new WeatherDataHourly(
                    new Date(el.datetimeEpoch * 1000).getHours(),
                    el.temp,
                    el.icon // либо заменить на "getRusWeatherConditionVisualcrossing(el.conditions)" если нужно описание
                )
                visualWeatherHourly.push(dataHour);
            });

            console.log("visualWeatherHourly ", visualWeatherHourly);
            console.log(data.days[0].tempmin, data.days[0].tempmax);
            return visualWeather

        default:
            return new WeatherData()
    }

}