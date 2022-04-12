import React from 'react';
import { WeatherContentHome } from '../../Components/WeatherContentHome/WeatherContentHome';
import { SvgSun } from '../../Components/SVGIcons/SvgSun/SvgSun';
import { SvgCloud } from '../../Components/SVGIcons/SvgCloud/SvgCloud';
import { SvgRain } from '../../Components/SVGIcons/SvgRain/SvgRain';
import { ActionsSing } from "../../Components/ActionsSign/ActionsSing";
import {
    _urlOpenWeather,
    _urlWeatherBit,
    _urlVisualWeather,
    _urlYandex
} from '../../Service/Constant';
import "./Home.scss"


export const Home = () => {

    return (
        <div className="home-page container">

            <div className="home-page__btn-block">
                <ActionsSing />
            </div>


            <div className="home-page__svg-icons">
                <SvgCloud />
                <SvgSun />
                <SvgRain />
            </div>

            <div className="wather-content">
                <WeatherContentHome nameWeatherUrl={_urlOpenWeather} />
                <WeatherContentHome nameWeatherUrl={_urlYandex} />
                <WeatherContentHome nameWeatherUrl={_urlWeatherBit} />
                <WeatherContentHome nameWeatherUrl={_urlVisualWeather} />
            </div>

        </div>
    )

}
