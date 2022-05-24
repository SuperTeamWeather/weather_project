import React from "react";
import {useState} from "react"
import {FieldWeatherList} from "../../Components/FieldWeatherList/FieldWeatherList";
import "./WeatherSearch.scss"

export const WeatherSearch = () => {
    const [valueInput, setValueInput] = useState("")
    const [listWeatherCity, setListWeatherCity] = useState([])
    const handleInput = (event) => {
        setValueInput(prev => prev = event.target.value)
    }

    const searchCity = async (event) => {
        event.preventDefault()
    }

    return (
        <>
            <div className="weather-search">
                <form onSubmit={searchCity} className="weather-search__form">
                    <h3 className="weather-search__title">Поиск:</h3>
                    <div className="weather-search__block-search">
                        <input onChange={handleInput}
                               className="weather-search__input"
                               value={valueInput}
                               type="text"
                               placeholder="Введите город"/>
                        <button className="weather-search__btn" type="submit">Найти</button>
                    </div>

                    <div className="weather-search__list"></div>
                </form>
            </div>

            <div className="weather-search__city-list">
                <FieldWeatherList listWeatherCitys={listWeatherCity}/>
            </div>

        </>
    )
}
