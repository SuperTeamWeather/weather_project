import React from "react";
import { WeatherContentDay } from '../../Components/WeatherContentDay/WeatherContentDay';

import { useEffect, useState } from "react"
import { getGeoCoordinatesUser } from "../../Service/UserGeoLocation";
import { getNameWeatherFromRegExp } from "../../Service/tools";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectorWeathersData
} from "../../Store/WeatherReducer/selectors";
import { featchWeather } from "../../Store/WeatherReducer/action";
import "./WeatherItem.scss"
import { useParams } from "react-router-dom";
import { weathersData } from '../../Service/Constant';
import { Link } from "react-router-dom";


export const WeatherItem = () => {
    const dispatch = useDispatch();
    const weather = useSelector(getSelectorWeathersData);
    const { id } = useParams();

    const weatherParams = weathersData[id];

    const nameWeatherUrl = weatherParams.url;

    // console.log('nameWeatherUrl: ', nameWeatherUrl);

    const nameWeather = getNameWeatherFromRegExp(nameWeatherUrl);
    const [currentPositionCoordinates, setPositionCoordinates] = useState(null);

    useEffect(async () => {

        if (Object.keys(weather).length == 0) {
            setPositionCoordinates(
                await getGeoCoordinatesUser()
            );
        }
    }, []);

    useEffect(
        () => {
            if (currentPositionCoordinates) {
                dispatch(
                    featchWeather(
                        currentPositionCoordinates?.coords,
                        nameWeatherUrl,
                        nameWeather
                    )
                )
            }
        },
        [
            currentPositionCoordinates,
            nameWeatherUrl,
            dispatch,
            nameWeather
        ]

    );


    let rows = [];
    for (let i = 0; i < weather[nameWeather]?.daily?.length; i++) {
        rows.push(
            <WeatherContentDay
                weather={weather[nameWeather].daily[i]}
                nameWeather={nameWeather}
                nameWeatherUrl={nameWeatherUrl}
                dayNum={i}
                key={i}
            />
        );
    }

    return (
        <div className="home-page weather-item-page">
            <div className="content-center">
                <div className="weather-item-page__titleArea">
                    <Link to={'/'} className="backLink">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.59375 19C0.59375 29.168 8.83203 37.4062 19 37.4062C29.168 37.4062 37.4062 29.168 37.4062 19C37.4062 8.83203 29.168 0.59375 19 0.59375C8.83203 0.59375 0.59375 8.83203 0.59375 19ZM33.8438 19C33.8438 27.2012 27.2012 33.8438 19 33.8438C10.7988 33.8438 4.15625 27.2012 4.15625 19C4.15625 10.7988 10.7988 4.15625 19 4.15625C27.2012 4.15625 33.8438 10.7988 33.8438 19ZM28.5 17.5156V20.4844C28.5 20.9742 28.0992 21.375 27.6094 21.375H19V26.3477C19 27.1418 18.0426 27.5352 17.4785 26.9785L10.1309 19.6309C9.78203 19.282 9.78203 18.718 10.1309 18.3691L17.4785 11.0215C18.0426 10.4574 19 10.8582 19 11.6523V16.625H27.6094C28.0992 16.625 28.5 17.0258 28.5 17.5156Z" fill="white" />
                        </svg>
                    </Link>
                    <h1>
                        {nameWeather}
                    </h1>
                </div>
                <div className="grid-layout">
                    {rows}
                </div>
            </div>
        </div>
    )
}
