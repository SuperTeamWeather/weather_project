import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyModal } from "../MyModal/MyModal";
import { SearchCityHome } from "../SearchCityHome/SearchCityHome";
import { featchWeather } from "../../Store/WeatherReducer/action";
import {
    changeActiveModal, changeActiveBtnModal
} from "../../Store/CurrentUserDataReducer/action";
import {
    getSelectorCurrentUserActiveModal, getSelectorCurrentUserActiveBtnModal
} from "../../Store/CurrentUserDataReducer/selectors";
import { getSelectorWeathersData } from "../../Store/WeatherReducer/selectors";
import { getCurrentTime } from "../../Service/tools";
import "./CityName.scss"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

export const CityName = () => {

    const activeModal = useSelector(getSelectorCurrentUserActiveModal)
    const activeBtn = useSelector(getSelectorCurrentUserActiveBtnModal)
    const weather = useSelector(getSelectorWeathersData)

    const dispatch = useDispatch()

    const [cityName, setCityName] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        for (let key in weather) {

            if (weather[key]?.cityName) {
                setCityName(prev => prev = weather[key]?.cityName)
                return
            }
        }
    }, [weather])

    const changeCity = () => {
        setOpenModal(prev => prev = !prev);
        // dispatch(changeActiveBtnModal(event.target.dataset.name))
        // dispatch(changeActiveModal(true))
    }

    const getNewWeather = useCallback(async (cityCoord, urlName) => {
        dispatch(featchWeather(cityCoord, urlName))
    }, [dispatch])

    if (cityName) {
        return (<div className="city-name">
            <div>
                {/* {activeBtn === "city-change-open-modal" ? <MyModal active={activeModal}>
                    <SearchCityHome getNewWeather={getNewWeather}/>
                </MyModal> : ""} */}
                <SearchCityHome getNewWeather={getNewWeather} show={openModal} changeCity={changeCity} />
            </div>
            <div className="city-name__title">
                {cityName}
                <i data-name="city-change-open-modal" onClick={changeCity} className="fa-regular fa-pen-to-square"></i>
            </div>
            <div>
                {getCurrentTime()}
            </div>
        </div>)

    } else {
        return <div>
            <SkeletonTheme baseColor="#5184cc" highlightColor="#ffd21e">
                <Skeleton height={18} width={150} />
                <Skeleton height={18} width={200} />
            </SkeletonTheme>
        </div>
    }
}
