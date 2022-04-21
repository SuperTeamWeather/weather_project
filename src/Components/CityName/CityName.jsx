import React from "react";
import {useState, useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {MyModal} from "../MyModal/MyModal";
import {SearchCityHome} from "../SearchCityHome/SearchCityHome";
import {featchWeather} from "../../Store/WeatherReducer/action";
import {
    changeActiveModal, changeActiveBtnModal
} from "../../Store/CurrentUserDataReducer/action";
import {
    getSelectorCurrentUserActiveModal, getSelectorCurrentUserActiveBtnModal
} from "../../Store/CurrentUserDataReducer/selectors";
import {getSelectorWeathersData} from "../../Store/WeatherReducer/selectors";
import { getCurrentTime } from "../../Service/tools";
import "./CityName.scss"

export const CityName = () => {

    const activeModal = useSelector(getSelectorCurrentUserActiveModal)
    const activeBtn = useSelector(getSelectorCurrentUserActiveBtnModal)
    const weather = useSelector(getSelectorWeathersData)
    const [currentDate, setCurrentDate] = useState(() => new Date());

    const dispatch = useDispatch()

    const [cityName, setCityName] = useState("")

    useEffect(() => {

        for (let key in weather) {

            if (weather[key]?.cityName) {
                setCityName(prev => prev = weather[key]?.cityName)
                return
            }
        }
    }, [weather])

    const changeCity = (event) => {

        dispatch(changeActiveBtnModal(event.target.dataset.name))
        dispatch(changeActiveModal(true))

    }

    const getNewWeather = useCallback(async (cityCoord, urlName) => {
        dispatch(featchWeather(cityCoord, urlName))
    }, [dispatch])

    return (<div className="city-name">
        <div>
            {activeBtn === "city-change-open-modal" ? <MyModal active={activeModal}>
                <SearchCityHome getNewWeather={getNewWeather}/>
            </MyModal> : ""}
        </div>
        <div className="city-name__title">
            {cityName}
            <i data-name="city-change-open-modal" onClick={changeCity} className="fa-regular fa-pen-to-square"></i>
        </div>
        <p>
            {getCurrentTime(currentDate)}
        </p>
    </div>)
}
