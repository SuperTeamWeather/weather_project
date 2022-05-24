import React from "react";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {signIn} from "../../firebase";
import {AuthForm} from "../../Components/AuthForm/AuthForm";
import "./SignIn.scss"

export const SignIn = () => {

    const navigate = useNavigate();
    const [messageError, setMessageError] = useState("");

    const setLoginAndPass = async (inputEmail, inputPass) => {

        if (inputEmail === "" || inputPass === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!");
            return;
        }

        try {
            await signIn(inputEmail, inputPass);
        } catch (err) {
            setMessageError(prev => prev = err.message);
            return;
        }

        navigate("/");

    }

    return (
        <AuthForm messageError={messageError} setAuthUser={setLoginAndPass} titleForm={"SignIn"}/>
    )
}
