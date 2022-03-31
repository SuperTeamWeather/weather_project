import React from "react";
import {useEffect, useState} from "react"
import "./WeatherContentHome.scss"
import {getGeoCoordinatesUser} from "../../Service/UserGeoLocation";
import {getOpenWeather} from "../../Service/GetWeather";
import {getCurrentTime, getLogoWeatherDescription} from "../../Service/tools";

export const WeatherContentHome = () => {

    const [currentWeather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [currentPositionCoordinates, setPositionCoordinates] = useState(null);

    useEffect(async () => {
        setPositionCoordinates(await getGeoCoordinatesUser());
    }, [])

    useEffect(async () => {
        if (currentPositionCoordinates) {
            setWeather(await getOpenWeather(currentPositionCoordinates?.coords));
        }
    }, [currentPositionCoordinates])

    return (
        <main className="weather-home">
            {currentWeather ?
                <div className="weather-home__content">
                    <div className="weather-home__info">
                        <h2 className="weather-home__name-city">{currentWeather?.name}</h2>
                        <p className="weather-home__info-time">
                            {getCurrentTime(currentDate)}
                        </p>
                    </div>
                    <div className="weather-home__description">
                        {getLogoWeatherDescription(currentWeather.weather[0].icon)}
                        <p className="weather-home__text">{currentWeather.weather[0].description = currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1)}</p>
                        <div className="weather-home__temperature">
                            <p>{Math.round(currentWeather.main.temp - 273)}&#176;C</p>
                        </div>
                    </div>

                </div >
                : ""}
        </main >
    )
}
