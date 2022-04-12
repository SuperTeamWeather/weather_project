import React from "react";
import { useEffect, useState, useCallback } from "react"
import { getGeoCoordinatesUser } from "../../Service/UserGeoLocation";
import { getWeatherData } from "../../Service/GetWeather";
import {
    getCurrentTime,
    getLogoFromYandex,
    getLogoWeatherDescription,
    getNameWeatherFromRegExp
} from "../../Service/tools";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { getSelectorCurrentUserActiveModal } from "../../Store/CurrentUserDataReducer/selectors";
import { getSelectorCurrentUserActiveBtnModal } from "../../Store/CurrentUserDataReducer/selectors";
import { MyModal } from "../MyModal/MyModal";
import { SearchCityHome } from "../SearchCityHome/SearchCityHome";
import "./WeatherContentHome.scss"



export const WeatherContentHome = ({ nameWeatherUrl }) => {

    const dispatch = useDispatch()
    const activeModal = useSelector(getSelectorCurrentUserActiveModal)
    const activeBtn = useSelector(getSelectorCurrentUserActiveBtnModal)

    const [currentWeather, setWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [currentPositionCoordinates, setPositionCoordinates] = useState(null);


    useEffect(async () => {
        setPositionCoordinates(await getGeoCoordinatesUser());
    }, [])

    useEffect(async () => {
        if (currentPositionCoordinates) {
            setWeather(await getWeatherData(
                currentPositionCoordinates?.coords, nameWeatherUrl));
        }
    }, [currentPositionCoordinates])


    const changeCity = (event) => {

        dispatch(changeActiveBtnModal(event.target.dataset.name))
        dispatch(changeActiveModal(true))

    }

    const getNewWeather = useCallback(async (cityCoord, urlName = nameWeatherUrl) => {
        setWeather(await getWeatherData(cityCoord, urlName));
    }, [nameWeatherUrl])



    return (
        <div>
            <div>
                {activeBtn === "city-change-open-modal" ?
                    <MyModal active={activeModal}>
                        <SearchCityHome getNewWeather={getNewWeather} />
                    </MyModal>
                    : ""
                }
            </div>
            <main className="weather-home">

                {currentWeather ?
                    <div className="weather-home__content">

                        <div className="weather-home__info">
                            <h2
                                data-name="city-change-open-modal"
                                onClick={changeCity}
                                className="weather-home__name-city">
                                {currentWeather?.cityName}
                                <span
                                    data-name="city-change-open-modal"
                                > ({getNameWeatherFromRegExp(nameWeatherUrl)})</span>
                            </h2>

                            <p className="weather-home__info-time">
                                {getCurrentTime(currentDate)}
                            </p>
                        </div>

                        <div className="weather-home__description">
                            {nameWeatherUrl === "api/v1/YandexWeather" ?
                                getLogoFromYandex(currentWeather.description)
                                :
                                getLogoWeatherDescription(currentWeather.icon)}

                            <p className="weather-home__text">{currentWeather.description}</p>

                            <div className="weather-home__temperature">
                                <p>{Math.round(currentWeather.temp)}&#176;C</p>
                                <p className="weather-home__temperature-felt">
                                    Ощущается как {Math.round(currentWeather.feelsTemp)}&#176;C
                                </p>
                            </div>
                        </div>

                    </div >
                    : ""}
            </main >
        </div>

    )
}
