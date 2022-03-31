import React from "react";
import { useEffect, useState } from "react"
import { FieldWeatherList } from "../../Components/FieldWeatherList/FieldWeatherList";
import "./WeatherSearch.scss"


export const WeatherSearch = () => {

    // 06f902b2237e5817af2494e552d5c471  Это мой id для получения погоды

    const [valueInput, setValueInput] = useState("")
    const [listWeatherCitys, setListWeatherCitys] = useState([])

    useEffect(() => {
        // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ливингстон,us&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
        //     .then(data => data.json())
        //     .then(data => console.log(data))
    })

    const fetchCitys = (nameCitys) => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${nameCitys}&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
            .then(response => response.json())
            .then(dataCity => {
                fetch("city.list.json")
                    .then(data => data.json())
                    .then(data => {
                        const citys = data.filter(el => {
                            return el.name === dataCity[0].name
                        })
                        setListWeatherCitys(prev => prev = citys)
                    })
            })


        // Сдесь можно сразу получать несколько городов без использования скаченного файла которвый 32mb, при помощи "limit" Но тут города не всегда коректные приходят и по русски нельзя написать. А в примере выше можно и по русски писать и по английски

        // fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${nameCitys}&limit=5&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
        //     .then(response => response.json())
        //     .then(data => console.log(data))

    }

    const hendleInput = (event) => {
        setValueInput(prev => prev = event.target.value)
    }

    const searchCity = (event) => {
        event.preventDefault()

        fetchCitys(valueInput)

    }

    return (
        <>
            <div className="weather-search">
                <form onSubmit={searchCity} className="weather-search__form">
                    <h3 className="weather-search__title">Поиск:</h3>
                    <div className="weather-search__block-search">
                        <input onChange={hendleInput}
                            className="weather-search__input"
                            value={valueInput}
                            type="text"
                            placeholder="Введите город" />

                        <button className="weather-search__btn" type="submit">Найти</button>
                    </div>

                    <div className="weather-search__list"></div>
                </form>
            </div>

            <FieldWeatherList listWeatherCitys={listWeatherCitys} />

        </>
    )
}