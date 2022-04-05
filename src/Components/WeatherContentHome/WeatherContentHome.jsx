import React from "react";
import { useEffect, useState } from "react"
import "./WeatherContentHome.scss"
import { getGeoCoordinatesUser } from "../../Service/UserGeoLocation";
import { getOpenWeather } from "../../Service/GetWeather";
import { getCurrentTime, getLogoWeatherDescription } from "../../Service/tools";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { getSelectorCurrentUserActiveModal } from "../../Store/CurrentUserDataReducer/selectors";
import { getSelectorCurrentUserActiveBtnModal } from "../../Store/CurrentUserDataReducer/selectors";
import { MyModal } from "../MyModal/MyModal";
import { SearchCityHome } from "../SearchCityHome/SearchCityHome";



export const WeatherContentHome = () => {

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
            setWeather(await getOpenWeather(currentPositionCoordinates?.coords));
        }
    }, [currentPositionCoordinates])


    const changeCity = (event) => {

        dispatch(changeActiveBtnModal(event.target.dataset.name))
        dispatch(changeActiveModal(true))

    }

    const getNewWeather = async (cityCoord) => {

        setWeather(await getOpenWeather(cityCoord));
    }

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
                                className="weather-home__name-city">{currentWeather?.name}</h2>
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
        </div>

    )
}
