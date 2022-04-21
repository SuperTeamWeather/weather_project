import React from "react";
import { useEffect, useState } from "react"
import { getGeoCoordinatesUser } from "../../Service/UserGeoLocation";
import {
    getLogoFromYandex,
    getLogoWeatherDescription,
    getNameWeatherFromRegExp
} from "../../Service/tools";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectorWeathersData,
    getSelectorWeathersAlert,
    getSelectorWeathersIsLoader
} from "../../Store/WeatherReducer/selectors";
import { featchWeather } from "../../Store/WeatherReducer/action";
import Spinner from 'react-bootstrap/Spinner'
import "./WeatherContentHome.scss"


export const WeatherContentHome = ({ nameWeatherUrl }) => {

    const dispatch = useDispatch()

    const weather = useSelector(getSelectorWeathersData)
    const isLoader = useSelector(getSelectorWeathersIsLoader)
    const alertText = useSelector(getSelectorWeathersAlert)
    const nameWeather = getNameWeatherFromRegExp(nameWeatherUrl)

    const [currentPositionCoordinates, setPositionCoordinates] = useState(null);

    useEffect(async () => {
        setPositionCoordinates(await getGeoCoordinatesUser());
    }, [])

    useEffect(() => {
        console.log(nameWeather)
        if (currentPositionCoordinates) {
            dispatch(featchWeather(currentPositionCoordinates?.coords, nameWeatherUrl, nameWeather))
        }
    }, [currentPositionCoordinates, nameWeatherUrl, dispatch, nameWeather])


    return (

        <div>

            <div className="loader-spiner">
                {isLoader[nameWeather] ? <Spinner animation="grow" variant="warning" /> : ""}
            </div>

            <main className="weather-home">

                {weather[nameWeather] ?

                    <div className="weather-home__content">

                        <div className="weather-home__info">
                            <h3
                                className="weather-home__name-api-weather">
                                {nameWeather}

                            </h3>
                        </div>

                        <div className="weather-home__description">
                            {nameWeatherUrl === "api/v1/YandexWeather" ?
                                getLogoFromYandex(weather[nameWeather].description)
                                :
                                getLogoWeatherDescription(weather[nameWeather].icon)}

                            <p className="weather-home__text">{weather[nameWeather].description}</p>

                            <div className="weather-home__temperature">
                                <p>{Math.round(weather[nameWeather].temp)}&#176;C</p>
                                <p className="weather-home__temperature-felt">
                                    Ощущается как {Math.round(weather[nameWeather].feelsTemp)}&#176;C
                                </p>
                            </div>
                        </div>

                    </div >

                    : <div className="weather-home__alert">{alertText[nameWeather]}</div>

                }
            </main >
        </div>

    )
}
