import React from "react";
import {
    getLogoFromYandex, 
    getLogoWeatherDescription,
    getWeek,
    getCurrentTime
} from "../../Service/tools";
import "./WeatherContentDay.scss"
import {Accordion, useAccordionButton} from "react-bootstrap";
import {Carousel} from "../Carousel/Carousel";
import moment from 'moment';
import 'moment/locale/ru';

export const WeatherContentDay = ({
    weather, 
    nameWeather,
    nameWeatherUrl,
    dayNum
}) => {
    
    
    let dateDay = moment().add(dayNum, 'days').format('D MMMM');    
    let weekDay = moment().add(dayNum, 'days').format('dddd');
    
    weekDay= weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
    weekDay = dayNum == 0 ? `Сегодня, ${weekDay}` : weekDay;

    let dayOffClass = weekDay=='Суббота' || weekDay=='Воскресенье' ? 'dayOff' : '';
    
    
    return (
     
        <div className={`dayItem ${dayOffClass}`}>
            <main className="weather-home weather-day">                
                <div className="weather-home__content">                    
                    <div className="weather-home__info weather-day__info">                        
                        <div className="infoItem">
                            {dateDay}
                        </div>
                        <div className="infoItem dayName">
                            {weekDay} 
                        </div>
                        <div className="infoItem">
                        </div>
                    </div>                    
                    <div className="text-style">
                        от {weather?.tempMin}&nbsp;&#176;C до {weather?.tempMax}&nbsp;&#176;C;
                        <span> {weather?.description}</span>
                    </div>
                    <Accordion className="accordion-style">
                        <div className="weather-home__description">
                            <div className="weather-home__temperature text-style">
                                <div className="big-text">{Math.round(weather?.temp)}&nbsp;&#176;C</div>
                                <div className="weather-home__temperature-felt text-style">
                                    {/* Ощущается как {Math.round(weather?.feelsTemp)}&nbsp;&#176;C */}
                                </div>
                            </div>
                            <div className="icon-weather">
                                {nameWeatherUrl === "api/v1/YandexWeather" ? getLogoFromYandex(weather?.description) : getLogoWeatherDescription(weather?.icon)}
                                <div className="weather-home__text text-style">
                                    {weather?.description}
                                </div>
                            </div>
                            <div className="text-style">
                                <div>Ветер: {weather?.windSpeed}&nbsp;м/с,&nbsp;{weather?.windDirection}</div>
                                <div>Влажность: {weather?.humidity}%</div>
                                <div>Давление: {weather?.pressure}&nbsp;мм&nbsp;рт.&nbsp;ст.</div>
                            </div>
                            {dayNum == 0 ?
                                <CustomToggle eventKey="0">
                                    По&nbsp;часам
                                </CustomToggle>
                                :
                                ''
                            }

                        </div>
                        <Accordion.Collapse eventKey="0">
                            <Carousel nameWeatherUrl={nameWeatherUrl}/>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
                {/* :  */}
                {/* <div className="weather-home__alert">{alertText}</div> */}
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
