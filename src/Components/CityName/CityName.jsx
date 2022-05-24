import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchCityHome } from "../SearchCityHome/SearchCityHome";
import { featchWeather } from "../../Store/WeatherReducer/action";
import { getSelectorWeathersData } from "../../Store/WeatherReducer/selectors";
import { getCurrentTime } from "../../Service/tools";
import "./CityName.scss"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import Button from "react-bootstrap/Button";

export const CityName = () => {

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

    const findCity = () => {
        setOpenModal(prev => prev = !prev);
    }

    const getNewWeather = useCallback(async (cityCoord, urlName) => {
        dispatch(featchWeather(cityCoord, urlName))
    }, [dispatch])

    if (cityName) {
        return (<div className="city-name">
            <SearchCityHome getNewWeather={getNewWeather} show={openModal} findCity={findCity} />
            <Button size="sm"
                className="btn-change-city"
                variant="outline-light"
                onClick={findCity}
                data-name="city-change-open-modal">
                {cityName}
                <i className="fa-regular fa-pen-to-square"></i>
            </Button>

            <div className="title-time">
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
