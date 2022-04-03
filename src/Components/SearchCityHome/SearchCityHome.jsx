import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCitys } from "../../Service/FetchCitys";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import "./SearchCityHome.scss"

export const SearchCityHome = ({ getNewWeather }) => {

    const dispatch = useDispatch()

    const [valueInput, setValueInput] = useState("")
    const [listWeatherCitys, setListWeatherCitys] = useState([])


    const hendleInput = (event) => {
        setValueInput(prev => prev = event.target.value)
    }

    const searchCity = async (event) => {
        event.preventDefault()

        setListWeatherCitys(await fetchCitys(valueInput))

    }

    const getNewCity = (cityItem) => {

        const cityCoord = {
            latitude: cityItem.coord.lat,
            longitude: cityItem.coord.lon
        }

        getNewWeather(cityCoord)

        setValueInput(prev => prev = "")
        setListWeatherCitys(prev => prev = [])

        dispatch(changeActiveModal(false))
        dispatch(changeActiveBtnModal(""))

    }

    return (
        <div className="search-city">
            <form onSubmit={searchCity} className="search-city__form">
                <h4 className="search-city__title">Поиск</h4>
                <input
                    onChange={hendleInput}
                    value={valueInput}
                    type="text"
                    placeholder="Введите город"
                    className="search-city__input"
                />
                <button className="search-city__btn" type="submit">Найти</button>
            </form>

            <div className="search-city__city-list">
                <div className="search-city__content">
                    <ul className="search-city__list">
                        {listWeatherCitys.map(el => {
                            return <li
                                onClick={() => getNewCity(el)}
                                key={el.id}
                                className="search-city__item"
                            >
                                <div className="search-city__item-name">{el.name}</div>
                                <div className="search-city__item-country">{el.country}</div>
                                <div className="search-city__item-flag"><img src={`https://openweathermap.org/images/flags/${el.country.toLowerCase()}.png`} alt="flag" /></div>
                                <div className="search-city__item-state">{el.state ? "state " + el.state : ""}</div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )

}