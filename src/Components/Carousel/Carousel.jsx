import React, {useRef} from "react";
import {getLogoFromYandex, getLogoWeatherDescription, getNameWeatherFromRegExp, isMobile} from "../../Service/tools";
import {useSelector} from "react-redux";
import {getSelectorWeathersData} from "../../Store/WeatherReducer/selectors";
import "./Carousel.scss";

export const Carousel = ({nameWeatherUrl}) => {
    const weather = useSelector(getSelectorWeathersData);
    const nameWeather = getNameWeatherFromRegExp(nameWeatherUrl);

    if (isMobile.any()) {
        console.log('is mobile !');
    }
    const myRef = useRef(null);
    const scrollRight = () => {
        let leftPos = myRef.current.scrollLeft;
        myRef.current.scrollLeft = leftPos + 90 * 4;
    }
    const scrollLeft = () => {
        let leftPos = myRef.current.scrollLeft;
        myRef.current.scrollLeft = leftPos - 90 * 4;
    }

    return (<div className={!isMobile.any() ? 'carousel' : 'carousel-mobile'}>
        {!isMobile.any() ? <button className="carousel-btn btn-style" onClick={scrollLeft}>
            <i className="fa-solid fa-circle-chevron-left"></i>
        </button> : ''}
        <div className={!isMobile.any() ? 'hours' : 'hours-mobile'} ref={myRef}>
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
        {!isMobile.any() ? <button className="carousel-btn btn-style" onClick={scrollRight}>
            <i className="fa-solid fa-circle-chevron-right"></i>
        </button> : ''}
    </div>)
}
