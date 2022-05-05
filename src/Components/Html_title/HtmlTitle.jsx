import React from "react";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {getSelectorWeathersData} from "../../Store/WeatherReducer/selectors";
import {getNameWeatherFromRegExp} from "../../Service/tools";

export function HTMLTitle ({nameWeatherUrl}) {
    const weather = useSelector(getSelectorWeathersData);
    const nameWeather = getNameWeatherFromRegExp(nameWeatherUrl)
    const currentWeather = createdCurrentWeatherTitle(nameWeather, weather);
    return (
        <Helmet>
            <title>{weather[nameWeather] ? currentWeather : 'Super Weather'}</title>
        </Helmet>
    );
}

const createdCurrentWeatherTitle = (nameSource, data) => {
    return `${data[nameSource]?.temp}°C, ${data[nameSource]?.description}`
}
