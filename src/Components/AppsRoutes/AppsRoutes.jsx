import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "../Header/Header";
import {Home} from "../../Pages/Home/Home";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import {WeatherSearch} from "../../Pages/WeatherSearch/WeatherSearch";
import {WeatherItem} from "../../Pages/WeatherItem/WeatherItem";
import {Profile} from "../../Pages/Profile/Profile";

export const AppsRoutes = () => {
    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path='/' element={<Home/>}/>

                <Route path='weather' element={<PrivateRoute/>}>
                    <Route path='' element={<WeatherSearch/>}/>
                </Route>

                <Route path='weather/:id' element={<WeatherItem/>}/>

                <Route path='profile' element={<PrivateRoute/>}>
                    <Route path='' element={<Profile/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}