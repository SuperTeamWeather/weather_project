import {
    _urlOpenWeather,
    _urlYandex,
    _urlWeatherBit,
    _urlVisualWeather
} from "./Constant"
import { WeatherData } from "./classWeatherData"
import { getRusWeatherConditionYandex } from "./tools"


export const getUnitedWeatherData = (data, apiName) => {

    switch (apiName) {
        case _urlOpenWeather:
            return new WeatherData(
                data.name,
                data.main.temp,
                data.main.feels_like,
                data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
                data.wind.speed,
                data.wind.deg,
                data.main.humidity,
                Math.round(data.main.pressure * 0.75),
                data.weather[0].icon

            )

        case _urlYandex:
            return new WeatherData(
                data.geo_object.locality.name,
                data.fact.temp,
                data.fact.feels_like,
                getRusWeatherConditionYandex(data.fact.condition),
                data.fact.wind_speed,
                data.fact.wind_dir,
                data.fact.humidity,
                data.fact.pressure_mm,
                data.fact.icon
            )

        case _urlWeatherBit:
            return new WeatherData(
                data.data[0].city_name,
                data.data[0].temp,
                data.data[0].app_temp,
                data.data[0].weather.description,
                data.data[0].wind_spd,
                data.data[0].wind_cdir,
                data.data[0].rh,
                Math.round(data.data[0].pres * 0.75),
                data.data[0].weather.icon
            )

        case _urlVisualWeather:
            return new WeatherData(
                data.timezone,
                data.currentConditions.temp,
                data.currentConditions.feelslike,
                data.currentConditions.conditions,
                data.currentConditions.windspeed,
                data.currentConditions.winddir,
                data.currentConditions.humidity,
                Math.round(data.currentConditions.pressure * 0.75),
                data.currentConditions.icon
            )

        default:
            return new WeatherData()
    }

}