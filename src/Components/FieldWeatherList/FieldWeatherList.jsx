import React from "react";
import { Link } from "react-router-dom";
import "./FieldWeatherList.scss"

export const FieldWeatherList = ({ listWeatherCitys }) => {

    return (
        <div className="weather-field">
            <div className="weather-field__content">
                <ul className="weather-field__list">
                    {listWeatherCitys.map(el => {
                        return <Link
                            to={`/weather/${el.id}`}
                            key={el.id}
                            className="weather-field__item"
                        >
                            <div className="weather-field__item-name">{el.name}</div>
                            <div className="weather-field__item-country">{el.country}</div>
                            <div className="weather-field__item-flag"><img src={`https://openweathermap.org/images/flags/${el.country.toLowerCase()}.png`} alt="flag" /></div>
                            <div className="weather-field__item-state">{el.state ? "state " + el.state : ""}</div>
                        </Link>
                    })}
                </ul>
            </div>
        </div>
    )
}