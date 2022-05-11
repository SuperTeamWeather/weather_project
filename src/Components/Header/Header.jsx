import React from 'react';
import { CityName } from "../CityName/CityName";
import { Link } from "react-router-dom";
import { MenuComp } from '../MenuComp/MenuComp';
import './Header.scss'


export const Header = () => {

    return (<header className="header">
        <div className="content content-center">
            <div className="logo-title">
                <Link to={'/'}>
                    <img className="logo" src="./img/weather-icon2.png" alt="logo" />
                </Link>
                <CityName />
            </div>
            <MenuComp />
        </div>
    </header>)

}
