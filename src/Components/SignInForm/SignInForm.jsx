import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from
    "../../Store/CurrentUserDataReducer/action";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveStyleModal } from "../../Store/CurrentUserDataReducer/action";
import { signIn } from "../../firebase";
import "./SignInForm.scss"

export const SignInForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const inputRef = useRef(null)
    const [inputEmail, setInputEmail] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [messageError, setMessageError] = useState("")

    useEffect(() => {
        inputRef.current.focus()
    }, [])


    const hendleInputEmail = (event) => {
        setInputEmail(prev => prev = event.target.value)
    }

    const hendleInputPass = (event) => {
        setInputPass(prev => prev = event.target.value)
    }

    const setLoginAndPass = async (event) => {
        event.preventDefault();

        if (inputEmail === "" || inputPass === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!")
            return
        }


        try {
            const { user } = await signIn(inputEmail, inputPass)
            const dataUser = {
                email: user.email,
                id: user.uid
            }
            dispatch(setCurrentUser(dataUser))
        } catch (err) {
            setMessageError(prev => prev = err.message)
            return
        }


        setInputEmail(prev => prev = "")
        setInputPass(prev => prev = "")
        setMessageError(prev => prev = "")

        navigate("/")

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
                    value={inputEmail}
                    placeholder="email"
                    className="sign-in__input"
                    onChange={hendleInputEmail}
                    type="email" /></p>

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