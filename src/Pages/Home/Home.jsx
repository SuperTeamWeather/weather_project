import React from 'react';
import { WeatherContentHome } from '../../Components/WeatherContentHome/WeatherContentHome';
import { SvgSun } from '../../Components/SVGIcons/SvgSun/SvgSun';
import { SvgCloud } from '../../Components/SVGIcons/SvgCloud/SvgCloud';
import { SvgRain } from '../../Components/SVGIcons/SvgRain/SvgRain';
import "./Home.scss"
import {ActionsSing} from "../../Components/ActionsSign/ActionsSing";


export const Home = () => {
    return (
        <div className="home-page container">

            <div className="home-page__btn-block">
                <ActionsSing/>
            </div>


            <div className="home-page__svg-icons">
                <SvgCloud />
                <SvgSun />
                <SvgRain />
            </div>

            <div className="wather-content">
                <WeatherContentHome />
            </div>

        </div>
    )

}
