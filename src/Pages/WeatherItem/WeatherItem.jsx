import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./WeatherItem.scss"


export const WeatherItem = () => {
    const { id } = useParams()

    useEffect(() => {

        //! Сдесь перчислены разные варианты получения данных погоды можно выбрать одно

        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
            .then(response => response.json())
            .then(data => console.log(data))

        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=06f902b2237e5817af2494e552d5c471&lang=ru
        `)
            .then(response => response.json())
            .then(data => console.log(data))

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=06f902b2237e5817af2494e552d5c471
        `)
            .then(response => response.json())
            .then(data => console.log(data))
    }, [id])

    return (
        <div className="weather-item">
            <h3 className="weather-item__title">Weather</h3>
        </div>
    )
}