import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin, getUserPassword } from
    "../../Store/CurrentUserDataReducer/action";
import { getSelectorProfilesDataReducer } from
    "../../Store/ProfiilesDataReducer/selectors";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveStyleModal } from "../../Store/CurrentUserDataReducer/action";
import "./SignInForm.scss"

export const SignInForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const profilesData = useSelector(getSelectorProfilesDataReducer);

    const inputRef = useRef(null)
    const [inputLogin, setInputLogin] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [messageError, setMessageError] = useState("")

    useEffect(() => {
        inputRef.current.focus()
    }, [])


    const hendleInputLogin = (event) => {
        setInputLogin(prev => prev = event.target.value)
    }

    const hendleInputPass = (event) => {
        setInputPass(prev => prev = event.target.value)
    }

    const setLoginAndPass = (event) => {
        event.preventDefault();

        if (inputLogin === "" || inputPass === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!")
            return
        }

        if (!profilesData.hasOwnProperty(inputLogin)) {
            setMessageError(prev => prev = "Не правильное имя логина")
            return
        }

        if (profilesData[inputLogin]?.pass !== inputPass) {
            setMessageError(prev => prev = "Не верный пароль")
            return
        }

        dispatch(getUserLogin(inputLogin));
        dispatch(getUserPassword(inputPass))

        setInputLogin(prev => prev = "")
        setInputPass(prev => prev = "")
        setMessageError(prev => prev = "")

        navigate("profile")

        dispatch(changeActiveModal(false))
        dispatch(changeActiveBtnModal(""))

    }

    const changeModal = (event) => {
        dispatch(changeActiveBtnModal(event.target.textContent))
        dispatch(changeActiveStyleModal(event.target.textContent))
    }

    return (
        <div className="sign-in">
            <form onSubmit={setLoginAndPass} className="sign-in__form">
                <h4 className="sign-in__title">SignIn</h4>
                <p><input
                    ref={inputRef}
                    value={inputLogin}
                    placeholder="login"
                    className="sign-in__input"
                    onChange={hendleInputLogin}
                    type="text" /></p>

                <p><input
                    onChange={hendleInputPass}
                    className="sign-in__input"
                    placeholder="password"
                    value={inputPass}
                    type="password" /></p>
                <div className="sign-in__message-error">{messageError}</div>
                <button className="sign-in__btn" type="submit">Войти</button>
            </form>

            <p>ИЛИ</p>

            <button onClick={changeModal} className="sign-in__btn-signup">SignUp</button>
        </div>
    )
}