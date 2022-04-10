import React from "react";
import { useEffect, useState } from "react"
import "./WeatherContentHome.scss"
import { getGeoCoordinatesUser } from "../../Service/UserGeoLocation";
import { getOpenWeather, getWeatherFromWebService} from "../../Service/GetWeather";
import { getCurrentTime, getLogoWeatherDescription, getWindDirText, getWindDirTextYandex, getRusWeatherConditionYandex, getRusWeatherConditionVisualcrossing } from "../../Service/tools";
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

    const [currentWeather, setWeather] = useState([]);
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [currentPositionCoordinates, setPositionCoordinates] = useState(null);


    useEffect(async () => {
        setPositionCoordinates(await getGeoCoordinatesUser());
    }, [])

    useEffect(async () => {
        if (currentPositionCoordinates) {
            let cw = [];
            cw[0] = await getWeatherFromWebService(currentPositionCoordinates?.coords, 'OpenWeather');
            cw[1] = await getWeatherFromWebService(currentPositionCoordinates?.coords, 'WeatherBit');
            cw[2] = await getWeatherFromWebService(currentPositionCoordinates?.coords, 'VisualcrossingWeather');
            cw[3] = await getWeatherFromWebService(currentPositionCoordinates?.coords, 'YandexWeather');
            setWeather(cw);
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

                {currentWeather[0] ?
                    <div className="weather-home__content">

                        <div className="weather-home__info">
                            <h2
                                data-name="city-change-open-modal"
                                onClick={changeCity}
                                className="weather-home__name-city">{currentWeather[0]?.name}</h2>
                            <p className="weather-home__info-time">
                                {getCurrentTime(currentDate)}
                            </p>
                        </div>
                        {/* OpenWeather */}
                        {/* <div className="weather-home__description">
                            {getLogoWeatherDescription(currentWeather[0].weather[0].icon)}
                            <p className="weather-home__text">{currentWeather[0].weather[0].description = currentWeather[0].weather[0].description.charAt(0).toUpperCase() + currentWeather[0].weather[0].description.slice(1)}</p>
                            <div className="weather-home__temperature">
                                <p>{Math.round(currentWeather[0].main.temp)}&#176;C {Math.round(currentWeather[0].main.feels_like)}&#176;C</p>
                            </div>
                        </div> */}
                        {/* OpenWeather */}
                        <div className="weather-home__content">
                            <p className="weather-home__weather_text">OpenWeather</p>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{Math.round(currentWeather[0].main.temp)}&#176;C</span>
                                <span className="weather-home__weather_text">{currentWeather[0].weather[0].description = currentWeather[0].weather[0].description.charAt(0).toUpperCase() + currentWeather[0].weather[0].description.slice(1)}</span>
                                <span className="weather-home__weather_text">Ощущается как {Math.round(currentWeather[0].main.feels_like)}&#176;C</span>
                            </div>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{currentWeather[0].wind.speed} м/с, {currentWeather[0].wind.deg} {getWindDirText(currentWeather[0].wind.deg)}</span>
                                <span className="weather-home__weather_text">{currentWeather[0].main.humidity}%</span>
                                <span className="weather-home__weather_text">{Math.round(currentWeather[0].main.pressure * 0.75)} мм.рт.ст</span>
                            </div>
                        </div>
                        {/* WeatherBit */}
                        <div className="weather-home__content">
                            <p className="weather-home__weather_text">Weatherbit</p>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{Math.round(currentWeather[1].data[0].temp)}&#176;C</span>
                                <span className="weather-home__weather_text">{currentWeather[1].data[0].weather.description}</span>
                                <span className="weather-home__weather_text">Ощущается как {Math.round(currentWeather[1].data[0].app_temp)}&#176;C</span>
                            </div>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{currentWeather[1].data[0].wind_spd} м/с, {currentWeather[1].data[0].wind_cdir}</span>
                                <span className="weather-home__weather_text">{currentWeather[1].data[0].rh}%</span>
                                <span className="weather-home__weather_text">{Math.round(currentWeather[1].data[0].pres * 0.75)} мм.рт.ст</span>
                            </div>
                        </div>
                        {/* Visual crossing */}
                        <div className="weather-home__content">
                            <p className="weather-home__weather_text">Visual crossing weather</p>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{Math.round(currentWeather[2].currentConditions.temp)}&#176;C</span>
                                <span className="weather-home__weather_text">{currentWeather[2].currentConditions.conditions} {getRusWeatherConditionVisualcrossing(currentWeather[2].currentConditions.conditions)}</span>
                                <span className="weather-home__weather_text">Ощущается как {Math.round(currentWeather[2].currentConditions.feelslike)}&#176;C</span>
                            </div>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{currentWeather[2].currentConditions.windspeed} м/с, {currentWeather[2].currentConditions.winddir} {getWindDirText(currentWeather[2].currentConditions.winddir)}</span>
                                <span className="weather-home__weather_text">{currentWeather[2].currentConditions.humidity}%</span>
                                <span className="weather-home__weather_text">{Math.round(currentWeather[2].currentConditions.pressure * 0.75)} мм.рт.ст</span>
                            </div>
                        </div>
                        {/* YandexWeather */}
                        <div className="weather-home__content">
                            <p className="weather-home__weather_text">YandexWeather</p>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{Math.round(currentWeather[3].fact.temp)}&#176;C</span>
                                <span className="weather-home__weather_text">{currentWeather[3].fact.condition} {getRusWeatherConditionYandex(currentWeather[3].fact.condition)}</span>
                                <span className="weather-home__weather_text">Ощущается как {Math.round(currentWeather[3].fact.feels_like)}&#176;C</span>
                            </div>
                            <div className="weather-home__description">
                                <span className="weather-home__weather_text">{currentWeather[3].fact.wind_speed} м/с, {currentWeather[3].fact.wind_dir} {getWindDirTextYandex(currentWeather[3].fact.wind_dir)}</span>
                                <span className="weather-home__weather_text">{currentWeather[3].fact.humidity}%</span>
                                <span className="weather-home__weather_text">{currentWeather[3].fact.pressure_mm} мм.рт.ст</span>
                            </div>
                        </div>
                    </div >
                    : ""}
            </main >
        </div>

    )
}
