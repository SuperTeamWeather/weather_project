import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'


export const Header = () => {

    return (
        <header className="header">
            <div className="header__content container">
                <div className="header__logo">
                    <Link to={"/"} className="header__logo-title">
                        {/* <img src="./img/logo.jpg" alt="logo" /> */}
                    </Link>
                </div>
                <nav className="header__nav">
                    <Link to={"/weather"} className="header__nav-btn">Weather</Link>
                    <Link to={"/profile"} className="header__nav-btn">Profile</Link>
                </nav>
            </div>
        </header>
    )
}