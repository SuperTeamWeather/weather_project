import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveBtnModal } from '../../Store/CurrentUserDataReducer/action';
import { changeActiveModal } from '../../Store/CurrentUserDataReducer/action';
import { changeActiveStyleModal } from '../../Store/CurrentUserDataReducer/action';
import { getSelectorCurrentUserLogin } from '../../Store/CurrentUserDataReducer/selectors';
import { getSelectorCurrentUserActiveBtnModal } from '../../Store/CurrentUserDataReducer/selectors';
import { getSelectorCurrentUserActiveModal } from "../../Store/CurrentUserDataReducer/selectors"
import { WeatherContentHome } from '../../Components/WeatherContentHome/WeatherContentHome';
import { SvgSun } from '../../Components/SVGIcons/SvgSun/SvgSun';
import { SvgCloud } from '../../Components/SVGIcons/SvgCloud/SvgCloud';
import { SvgRain } from '../../Components/SVGIcons/SvgRain/SvgRain';
import { SignUpForm } from '../../Components/SignUpForm/SignUpForm';
import { SignInForm } from '../../Components/SignInForm/SignInForm';
import { MyModal } from "../../UI/MyModal/MyModal"
import "./Home.scss"


export const Home = () => {

    const dispatch = useDispatch()

    const currentUserLog = useSelector(getSelectorCurrentUserLogin)
    const activeModal = useSelector(getSelectorCurrentUserActiveModal)
    const activBtn = useSelector(getSelectorCurrentUserActiveBtnModal)

    const openModal = (event) => {

        if (event.target.textContent === "SignUp") {
            dispatch(changeActiveBtnModal(event.target.textContent))
            dispatch(changeActiveStyleModal(event.target.textContent))
            dispatch(changeActiveModal(true))
        } else {
            dispatch(changeActiveBtnModal(event.target.textContent))
            dispatch(changeActiveStyleModal(event.target.textContent))
            dispatch(changeActiveModal(true))
        }
    }

    return (
        <div className="home-page container">

            <div className="home-page__btn-block">
                <button
                    onClick={openModal}
                    disabled={!!currentUserLog}
                    className="home-page__btn">SignUp</button>

                <button
                    onClick={openModal}
                    disabled={!!currentUserLog}
                    className="home-page__btn">SignIn</button>
            </div>


            <div className="home-page__svg-icons">
                <SvgCloud />
                <SvgSun />
                <SvgRain />
            </div>

            <div className="wather-content">
                <WeatherContentHome />
            </div>

            <MyModal active={activeModal}>
                {activBtn === "SignUp" ? <SignUpForm /> : ""}
                {activBtn === "SignIn" ? <SignInForm /> : ""}
            </MyModal>

        </div>
    )

}