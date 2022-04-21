import React from 'react';
import {NavDropdown} from "react-bootstrap";
import './Header.scss'
import {CityName} from "../CityName/CityName";
import {Link} from "react-router-dom";

export const Header = () => {
    return (<header className="header">
        <div className="content content-center">
            <div className="logo-title">
                <img className="logo" src="./img/logo_small.png" alt="logo"/>
                <CityName/>
            </div>
            <div>
                {/*   <ActionsSing/>*/}
                <NavDropdown title="UserName">
                    <NavDropdown.Item>
                        <Link to={"/weather"} className="header__nav-btn">Погода</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={"/profile"} className="header__nav-btn">Профиль</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Выйти</NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    </header>)
}
