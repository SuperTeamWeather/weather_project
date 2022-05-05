import {
    _urlOpenWeather,
    _urlYandex,
    _urlWeatherBit,
    _urlVisualWeather
} from "./Constant"
import {WeatherData, WeatherDataDaily, WeatherDataHourly} from "./classWeatherData"
import {
    getWeek,
    getDayMonth,
    getWindDirText,
    getWindDirTextYandex,
    getRusWeatherConditionYandex,
    getRusWeatherConditionVisualcrossing
} from "./tools"
import {getNameWeatherFromRegExp} from "./tools"

export const getUnitedWeatherData = (data, apiName) => {

    const propertyHourly = "hourly";
    const propertyDaily = "daily";

    switch (apiName) {
        case _urlOpenWeather:
            const openWeather = {}
            const openWeatherHourly = []
            const openWeatherDaily = []

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
                        Math.round(el.temp),
                        el.weather[0].icon // либо заменить на "el.weather[0].description" если нужно описание
                    )
                    openWeatherHourly.push(dataHour);
                }
            });

            openWeather[getNameWeatherFromRegExp(apiName)].add(propertyHourly, openWeatherHourly)

            const openWeatherDailyArray = data.daily;
            openWeatherDailyArray.forEach((el, idx) => {
                if (idx < 7) {
                    let dataDay = new WeatherDataDaily(
                        Math.round(el.temp.day),
                        Math.round(el.temp.min),
                        Math.round(el.temp.max),
                        el.weather[0].description.charAt(0).toUpperCase() + el.weather[0].description.slice(1),
                        el.wind_speed.toFixed(1),
                        getWindDirText(el.wind_deg),
                        Math.round(el.humidity),
                        Math.round(el.pressure * 0.75),
                        el.weather[0].icon,
                        getDayMonth(new Date(el.dt * 1000)),
                        getWeek(new Date(el.dt * 1000).getDay())
                    )
                    openWeatherDaily.push(dataDay);
                }
            });

            openWeather[getNameWeatherFromRegExp(apiName)].add(propertyDaily, openWeatherDaily);
            // console.log('OW', openWeatherDaily);

            return openWeather

        case _urlYandex:
            const yandex = {}
            const yandexHourly = []
            const yandexDaily = []

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

            yandex[getNameWeatherFromRegExp(apiName)].add(propertyHourly, yandexHourly)

            const yandexDailyArray = data.forecasts;
            yandexDailyArray.forEach((el, idx) => {
                if (idx < 7) {
                    let dataDay = new WeatherDataDaily(
                        Math.round(el.parts.day.temp_avg),
                        Math.round(el.parts.day_short.temp_min),
                        Math.round(el.parts.day_short.temp),
                        getRusWeatherConditionYandex(el.parts.day_short.condition),
                        el.parts.day_short.wind_speed.toFixed(1),
                        getWindDirTextYandex(el.parts.day_short.wind_dir),
                        Math.round(el.parts.day_short.humidity),
                        el.parts.day_short.pressure_mm,
                        el.parts.day_short.icon,
                        getDayMonth(new Date(el.date_ts * 1000)),
                        getWeek(new Date(el.date_ts * 1000).getDay())
                    )
                    yandexDaily.push(dataDay);
                }
            });

            yandex[getNameWeatherFromRegExp(apiName)].add(propertyDaily, yandexDaily);
            // console.log("Y", yandexDaily);

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

            weatherBit[getNameWeatherFromRegExp(apiName)].add(propertyHourly, weatherBitHourly)
            //console.log(weatherBit);
            return weatherBit

        case _urlVisualWeather:
            const visualWeather = {}
            const visualWeatherHourly = []
            const visualWeatherDaily = []

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

            visualWeather[getNameWeatherFromRegExp(apiName)].add(propertyHourly, visualWeatherHourly)

            const visualWeatherDailyArray = data.days;
            visualWeatherDailyArray.forEach((el, idx) => {
                if (idx < 7) {
                    let dataDay = new WeatherDataDaily(
                        Math.round(el.temp),
                        Math.round(el.tempmin),
                        Math.round(el.tempmax),
                        getRusWeatherConditionVisualcrossing(el.conditions),
                        el.windspeed.toFixed(1),
                        getWindDirText(el.winddir),
                        Math.round(el.humidity),
                        Math.round(el.pressure * 0.75),
                        el.icon,
                        getDayMonth(new Date(el.datetimeEpoch * 1000)),
                        getWeek(new Date(el.datetimeEpoch * 1000).getDay())
                    )
                    visualWeatherDaily.push(dataDay);
                }
            });

            visualWeather[getNameWeatherFromRegExp(apiName)].add(propertyDaily, visualWeatherDaily);
            // console.log("VC", visualWeatherDaily);

            return visualWeather

        default:
            return new WeatherData()
    }

}
