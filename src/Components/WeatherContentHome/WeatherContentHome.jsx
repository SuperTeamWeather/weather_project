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
import { Accordion, useAccordionButton } from "react-bootstrap";

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
        if (currentPositionCoordinates) {
            dispatch(featchWeather(currentPositionCoordinates?.coords, nameWeatherUrl, nameWeather))
        }
    }, [currentPositionCoordinates, nameWeatherUrl, dispatch, nameWeather])

    return (
        <div>
            <div className="loader-spinner">
                {isLoader[nameWeather] ? <Spinner animation="border" variant="warning" /> : ""}
            </div>
            <main className="weather-home">
                {weather[nameWeather] ?
                    <div className="weather-home__content">
                        <div className="weather-home__info">
                            <div className="weather-home__name-api-weather text-style">
                                {nameWeather}
                            </div>
                            <a href="#/" className="link-custom text-style">По&nbsp;дням</a>
                        </div>
                        <div className="text-style">
                            Сегодня от +3°C ... +11°C; переменная облачность; без осадков
                        </div>
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
                                    <div>Ветер: 1,0 м/с, северный</div>
                                    <div>Влажность: 36%</div>
                                    <div>Давление: 747 мм рт. ст.</div>
                                </div>
                                <CustomToggle className="" eventKey="0">
                                    По&nbsp;часам
                                </CustomToggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <div className="carousel">
                                    <button className="carousel-btn">
                                        <i className="fa-solid fa-circle-chevron-left"></i>
                                    </button>
                                    <div className="hours">
                                        <div className="item-hours text-style">
                                            <div>00:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                        <div className="item-hours text-style">
                                            <div>01:00</div>
                                            <img src="/img/test.png" alt="test.png"></img>
                                            <div>+11°C</div>
                                        </div>
                                    </div>
                                    <button className="carousel-btn">
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

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );
    return (
        <div className="link-custom text-style" onClick={decoratedOnClick}>{children}</div>
    );
}
