import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { Home } from "../../Pages/Home/Home";
import { WeatherItem } from "../../Pages/WeatherItem/WeatherItem";
import { SignUp } from "../../Pages/SignUp/SignUp"
import { SignIn } from "../../Pages/SignIn/SignIn";

export const AppsRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='signUp' element={<SignUp />} />
                <Route path='signIn' element={<SignIn />} />
                <Route path='/weather_days/:id' element={<WeatherItem />} />
            </Routes>
        </BrowserRouter>
    )
}
