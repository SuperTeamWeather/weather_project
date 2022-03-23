import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { goOutUser } from "../../Store/CurrentUserDataReducer/action";
import { getSelectorCurrentUserLogin } from "../../Store/CurrentUserDataReducer/selectors";
import "./Profile.scss"


export const Profile = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(getSelectorCurrentUserLogin)

    const goOut = () => {
        dispatch(goOutUser())
    }

    return (
        <div className="profile">
            <div className="profile__content container">
                <h3 className="profile__title">Login: <span>{userLogin}</span></h3>
                <button className="profile__btn-exit" onClick={goOut}>Выйти</button>
                <p className="profile__favorite-title">Избранные города</p>
                <div className="profile__favorite-weather-block">

                </div>
            </div>

        </div>
    )
}