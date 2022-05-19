import React from "react";
import {useEffect, useState} from "react"
import {getGeoCoordinatesUser} from "../../Service/UserGeoLocation";
import {
    getLogoFromYandex, getLogoWeatherDescription, getNameWeatherFromRegExp
} from "../../Service/tools";
import {useDispatch, useSelector} from "react-redux";
import {
    getSelectorWeathersData, getSelectorWeathersAlert, getSelectorWeathersIsLoader
} from "../../Store/WeatherReducer/selectors";
import {featchWeather} from "../../Store/WeatherReducer/action";
import "./WeatherContentHome.scss"
import {Accordion, useAccordionButton} from "react-bootstrap";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Carousel} from "../Carousel/Carousel";

export const WeatherContentHome = ({nameWeatherUrl, id}) => {
    const dispatch = useDispatch();
    const weather = useSelector(getSelectorWeathersData);

    console.log('weather from WeatherContentHome: ', weather);
    
    const isLoader = useSelector(getSelectorWeathersIsLoader);
    const alertText = useSelector(getSelectorWeathersAlert)
    const nameWeather = getNameWeatherFromRegExp(nameWeatherUrl)

    const [currentPositionCoordinates, setPositionCoordinates] = useState(null);

    useEffect(async () => {
        setPositionCoordinates(await getGeoCoordinatesUser());
    }, [])

    useEffect(() => {
        
        console.log('currentPositionCoordinates from weather content home: ', currentPositionCoordinates);

        if (currentPositionCoordinates) {
            
            console.log('currentPositionCoordinates?.coords from weather content home: ', currentPositionCoordinates?.coords);
            console.log('nameWeatherUrl from weather content home: ', nameWeatherUrl);
            console.log('nameWeather from weather content home: ', nameWeather);

            
            dispatch(featchWeather(currentPositionCoordinates?.coords, nameWeatherUrl, nameWeather))
        }
    }, [currentPositionCoordinates, nameWeatherUrl, dispatch, nameWeather]);

    return (<div>
            <div className="loader-spinner">
                {isLoader[nameWeather] ? <SkeletonTheme borderRadius={16}
                                                        baseColor="#5184cc"
                                                        highlightColor="#ffd21e">
                    <Skeleton height={170}/>
                </SkeletonTheme> : ""}
            </div>
            <main className="weather-home">
                {weather[nameWeather] ? <div className="weather-home__content">
                    <div className="weather-home__info">
                        <div className="weather-home__name-api-weather text-style">
                            {nameWeather}
                        </div>
                        <div className="link-custom text-style btn-style unselectable">
                            <a className='link-href' href={`/weather_days/${id}`} >По&nbsp;дням</a>
                        </div>
                    </div>
                    {weather[nameWeather].tempMin ? <div className="text-style">
                        Сегодня от {weather[nameWeather].tempMin}&nbsp;&#176;C до {weather[nameWeather].tempMax}&nbsp;&#176;C;
                        <span> {weather[nameWeather].description}</span>
                    </div> : <div className="text-style">
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
                                <div>Ветер: {weather[nameWeather].windSpeed}&nbsp;м/с,&nbsp;{weather[nameWeather].windDirection}</div>
                                <div>Влажность: {weather[nameWeather].humidity}%</div>
                                <div>Давление: {weather[nameWeather].pressure}&nbsp;мм&nbsp;рт.&nbsp;ст.</div>
                            </div>
                            {weather[nameWeather]?.hourly?.length === 0 ?
                                <div className="text-flex">
                                    <div className="disabled-btn unselectable max-line">
                                        По&nbsp;часам
                                    </div>
                                </div>
                                :
                                <CustomToggle eventKey="0">
                                    По&nbsp;часам
                                </CustomToggle>
                            }

                        </div>
                        <Accordion.Collapse eventKey="0">
                            <Carousel nameWeatherUrl={nameWeatherUrl}/>
                        </Accordion.Collapse>
                    </Accordion>
                </div> : <div className="weather-home__alert">{alertText[nameWeather]}</div>}
            </main>
        </div>

    )
}

function CustomToggle ({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'),);
    return (
        <div className="text-flex">
            <div className="link-custom text-style btn-style unselectable max-line"
                 onClick={decoratedOnClick}>
                {children}
            </div>
        </div>

    );
}
