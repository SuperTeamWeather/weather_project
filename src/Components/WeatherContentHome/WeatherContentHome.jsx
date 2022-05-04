import React, {useRef} from "react";
import {useEffect, useState} from "react"
import {getGeoCoordinatesUser} from "../../Service/UserGeoLocation";
import {
    getLogoFromYandex,
    getLogoWeatherDescription,
    getNameWeatherFromRegExp
} from "../../Service/tools";
import {useDispatch, useSelector} from "react-redux";
import {
    getSelectorWeathersData,
    getSelectorWeathersAlert,
    getSelectorWeathersIsLoader
} from "../../Store/WeatherReducer/selectors";
import {featchWeather} from "../../Store/WeatherReducer/action";
import Spinner from 'react-bootstrap/Spinner'
import "./WeatherContentHome.scss"
import {Accordion, useAccordionButton} from "react-bootstrap";

export const WeatherContentHome = ({nameWeatherUrl}) => {

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
        if (currentPositionCoordinates) {
            dispatch(featchWeather(currentPositionCoordinates?.coords, nameWeatherUrl, nameWeather))
        }
    }, [currentPositionCoordinates, nameWeatherUrl, dispatch, nameWeather]);

    const myRef = useRef(null);

    const scrollRight = () => {
        let leftPos = myRef.current.scrollLeft;
        myRef.current.scrollLeft = leftPos + 90 * 4;
    }
    const scrollLeft = () => {
        let leftPos = myRef.current.scrollLeft;
        myRef.current.scrollLeft = leftPos - 90 * 4;
    }

    return (
        <div>
            <div className="loader-spinner">
                {isLoader[nameWeather] ? <Spinner animation="border" variant="warning"/> : ""}
            </div>
            <main className="weather-home">
                {weather[nameWeather] ?
                    <div className="weather-home__content">
                        <div className="weather-home__info">
                            <div className="weather-home__name-api-weather text-style">
                                {nameWeather}
                            </div>
                            <div className="link-custom text-style btn-style unselectable">
                                <a className='link-href' href="/weather/1">По&nbsp;дням</a>
                            </div>
                        </div>
                        {weather[nameWeather].tempMin ?
                            <div className="text-style">
                                Сегодня от {weather[nameWeather].tempMin}&nbsp;&#176;C до {weather[nameWeather].tempMax}&nbsp;&#176;C;
                                <span> {weather[nameWeather].description}</span>
                            </div>
                            :
                            <div className="text-style">
                                <span>{weather[nameWeather].description}</span>
                            </div>}

                        <Accordion className="accordion-style">
                            <div className="weather-home__description">
                                <div className="weather-home__temperature text-style">
                                    <div className="big-text">{Math.round(weather[nameWeather].temp)}&nbsp;&#176;C</div>
                                    <div className="weather-home__temperature-felt text-style">
                                        Ощущается как {Math.round(weather[nameWeather].feelsTemp)}&nbsp;&#176;C
                                    </div>
                                </div>
                                <div className="icon-weather">
                                    {nameWeatherUrl === "api/v1/YandexWeather" ? getLogoFromYandex(weather[nameWeather].description) : getLogoWeatherDescription(weather[nameWeather].icon)}
                                    <div className="weather-home__text text-style">
                                        {weather[nameWeather].description}
                                    </div>
                                </div>
                                <div className="text-style">
                                    <div>Ветер: {weather[nameWeather].windSpeed} м/с,&nbsp;{weather[nameWeather].windDirection}</div>
                                    <div>Влажность: {weather[nameWeather].humidity}%</div>
                                    <div>Давление: {weather[nameWeather].pressure} мм рт. ст.</div>
                                </div>
                                <CustomToggle eventKey="0">
                                    По&nbsp;часам
                                </CustomToggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <div className="carousel">
                                    <button className="carousel-btn btn-style" onClick={scrollLeft}>
                                        <i className="fa-solid fa-circle-chevron-left"></i>
                                    </button>
                                    <div className="hours" ref={myRef}>
                                        <div className="item-hours text-error">
                                            {weather[nameWeather]?.hourly?.length === 0 ? "Нет данных" : ""}
                                        </div>
                                        {weather[nameWeather]?.hourly?.map((el, idx) => {
                                            return <div
                                                key={idx}
                                                className="item-hours text-style">
                                                <div>{el.time < 10 ? `0${el.time}:00` : `${el.time}:00`}</div>
                                                <div className="icon-weather">
                                                    {nameWeatherUrl === "api/v1/YandexWeather" ? getLogoFromYandex(weather[nameWeather].description) : getLogoWeatherDescription(el.icon)}
                                                </div>
                                                <div>{el.temp}&nbsp;&#176;C</div>
                                            </div>
                                        })}

                                    </div>
                                    <button className="carousel-btn btn-style" onClick={scrollRight}>
                                        <i className="fa-solid fa-circle-chevron-right"></i>
                                    </button>
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </div>
                    : <div className="weather-home__alert">{alertText[nameWeather]}</div>
                }
            </main>
        </div>

    )
}

function CustomToggle ({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );
    return (
        <div className="link-custom text-style btn-style unselectable" onClick={decoratedOnClick}>{children}</div>
    );
}
