import React from "react";
import { useEffect, useState } from "react"
import { Sun } from "../SVGIcons/SvgDescription/Sun/Sun";
import { Rain } from "../SVGIcons/SvgDescription/Rain/Rain";
import { SunAndCloud } from "../SVGIcons/SvgDescription/SunAndCloud/SunAndCloud";
import { Cloud } from "../SVGIcons/SvgDescription/Cloud/Cloud";
import { Snow } from "../SVGIcons/SvgDescription/Snow/Snow";
import "./WeatherContentHome.scss"

export const WeatherContentHome = () => {

    const [currentWeather, setCurrentWeather] = useState(null);

    const [currentDate, setCurrentDate] = useState(() => new Date())

    useEffect(() => {

        const getPositionGeoAndWeather = async () => {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })

            return {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }
        }

        getPositionGeoAndWeather()
            .then(data => {

                fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&appid=06f902b2237e5817af2494e552d5c471`)
                    .then(response => response.json())
                    .then(data => {
                        return {
                            lat: data[0].lat,
                            lon: data[0].lon
                        }
                    })
                    .then(data => {
                        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
                            .then(response => response.json())
                            .then(data => {
                                setCurrentWeather(prev => prev = data)
                            })
                    })
            })
    }, [])

    const getWeek = (week) => {
        switch (week) {
            case 0:
                return "Воскресение"

            case 1:
                return "Понедельник"

            case 2:
                return "Вторник"

            case 3:
                return "Среда"

            case 4:
                return "Четверг"

            case 5:
                return "Пятница"

            case 6:
                return "Суббота"


            default: return ""
        }
    }

    const getCurrentTime = () => {
        const addLeadingZero = (d) => {
            return (d < 10) ? "0" + d : d
        }

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes()
        const month = currentDate.getMonth()
        const day = currentDate.getDate()
        const year = currentDate.getFullYear()

        return `${addLeadingZero(month + 1)}.${addLeadingZero(day)}.${year}  ${getWeek(currentDate.getDay())} ${addLeadingZero(hours)}:${addLeadingZero(minutes)}`

    }

    const getLogoWeatherDescription = (logo) => {
        switch (logo) {
            case "01d":
                return <Sun />
            case "01n":
                return <Sun />

            case "02d":
                return <SunAndCloud />
            case "02n":
                return <SunAndCloud />

            case "03d":
                return <Cloud />
            case "03n":
                return <Cloud />
            case "04d":
                return <Cloud />
            case "04n":
                return <Cloud />

            case "09d":
                return <Rain />
            case "09n":
                return <Rain />
            case "10d":
                return <Rain />
            case "10n":
                return <Rain />
            case "11d":
                return <Rain />
            case "11n":
                return <Rain />

            case "13d" || "13n":
                return <Snow />
            case "13n":
                return <Snow />

            default:
                return ""
        }
    }


    return (
        <main className="weather-home">

            {currentWeather ?
                <div className="weather-home__content">

                    <div className="weather-home__info">
                        <h2 className="weather-home__name-city">{currentWeather.name}</h2>
                        <p className="weather-home__info-time">
                            {/* {getWeek(currentDate.getDay())} {currentDate.getHours()}:{currentDate.getMinutes()} */}
                            {getCurrentTime()}
                        </p>

                    </div>

                    <div className="weather-home__description">
                        {getLogoWeatherDescription(currentWeather.weather[0].icon)}

                        <p className="weather-home__text">{currentWeather.weather[0].description = currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1)}</p>


                        <div className="weather-home__temperature">
                            <p>{Math.round(currentWeather.main.temp - 273)}&#176;C</p>
                        </div>

                    </div>

                </div >

                : ""}
        </main >
    )
}