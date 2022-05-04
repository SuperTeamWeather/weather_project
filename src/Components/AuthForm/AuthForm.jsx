import React from "react";
import { useState, useRef, useEffect } from "react";
import "./AuthForm.scss";


export const AuthForm = ({ messageError, setAuthUser, titleForm }) => {

    const inputRef = useRef(null)

    const [inputLogin, setInputLogin] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPass, setInputPass] = useState("");

    useEffect(() => {
        inputRef.current.focus()
    }, [])


    const hendleInputLogin = (event) => {
        setInputLogin(prev => prev = event.target.value)
    }

    const hendleInputEmail = (event) => {
        setInputEmail(prev => prev = event.target.value)
    }

    const hendleInputPass = (event) => {
        setInputPass(prev => prev = event.target.value)
    }

    const handleFormAuthClick = (event) => {
        event.preventDefault()

        setAuthUser(inputEmail, inputPass, inputLogin)

    }

    return (
        <div className="auth-form">
            <form onSubmit={handleFormAuthClick} className="auth-form__form">
                <h4 className="auth-form__title">{titleForm}:</h4>
                <p>{titleForm === "SignUp" && <input
                    ref={inputRef}
                    value={inputLogin}
                    placeholder="login"
                    className="auth-form__input"
                    onChange={hendleInputLogin}
                    type="text" />}</p>

                <p><input
                    ref={titleForm === "SignIn" ? inputRef : null}
                    value={inputEmail}
                    placeholder="email"
                    className="auth-form__input"
                    onChange={hendleInputEmail}
                    type="email" /></p>

                <p><input
                    className="auth-form__input"
                    onChange={hendleInputPass}
                    placeholder="password"
                    value={inputPass}
                    type="password" /></p>
                <div className="auth-form__message-error">{messageError}</div>

                <button className="auth-form__btn" type="submit">{titleForm}</button>
            </form>
        </div>
    )
}