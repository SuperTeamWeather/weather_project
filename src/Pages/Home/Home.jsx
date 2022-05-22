import React from 'react';
import {WeatherContentHome} from '../../Components/WeatherContentHome/WeatherContentHome';
import {SvgSun} from '../../Components/SVGIcons/SvgSun/SvgSun';
import {SvgCloud} from '../../Components/SVGIcons/SvgCloud/SvgCloud';
import {SvgRain} from '../../Components/SVGIcons/SvgRain/SvgRain';
import {
    _urlOpenWeather,
    _urlWeatherBit,
    _urlVisualWeather,
    _urlYandex
} from '../../Service/Constant';
import "./Home.scss"

export const Home = () => {
    return (
        <div className="home-page">
            <div className="content-center">
                <div className="hello-icon">
                    <SvgCloud/>
                    <SvgSun/>
                    <SvgRain/>
                </div>
                <div className="grid-layout">
                    <WeatherContentHome nameWeatherUrl={_urlOpenWeather} id='0'/>
                    <WeatherContentHome nameWeatherUrl={_urlYandex} id='1'/>
                    <WeatherContentHome nameWeatherUrl={_urlWeatherBit} id='2'/>
                    <WeatherContentHome nameWeatherUrl={_urlVisualWeather} id='3'/>
                </div>
            </div>
        </div>
    )

}
