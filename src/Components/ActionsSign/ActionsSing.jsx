import React from 'react';
import {
    changeActiveBtnModal,
    changeActiveModal,
    changeActiveStyleModal
} from "../../Store/CurrentUserDataReducer/action";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectorCurrentUserActiveBtnModal,
    getSelectorCurrentUserActiveModal,
    getSelectorCurrentUserLogin
} from "../../Store/CurrentUserDataReducer/selectors";
import "./ActionsSing.scss"
import { MyModal } from "../MyModal/MyModal";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { SignInForm } from "../SignInForm/SignInForm";

export const ActionsSing = () => {
    const dispatch = useDispatch()

    const currentUserLog = useSelector(getSelectorCurrentUserLogin)
    const activeModal = useSelector(getSelectorCurrentUserActiveModal)
    const activeBtn = useSelector(getSelectorCurrentUserActiveBtnModal)



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
        <div className="btn-container">
            <button
                onClick={openModal}
                disabled={!!currentUserLog}
                className="signUp-btn home-page__btn">SignUp
            </button>
            <button
                onClick={openModal}
                disabled={!!currentUserLog}
                className="signIn-btn home-page__btn">SignIn
            </button>
            <div>
                {activeBtn === "city-change-open-modal" ? ""
                    : <MyModal active={activeModal} >
                        {activeBtn === "SignUp" ? <SignUpForm /> : ""}
                        {activeBtn === "SignIn" ? <SignInForm /> : ""}
                    </MyModal>}

            </div>
        </div>
    )
}
