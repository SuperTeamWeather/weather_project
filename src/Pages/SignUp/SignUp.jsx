import React from "react";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {signUp, getUserRef} from "../../firebase";
import {AuthForm} from "../../Components/AuthForm/AuthForm";
import {set} from "firebase/database";
import "./SignUp.scss"

export const SignUp = () => {

    const navigate = useNavigate();

    const [messageError, setMessageError] = useState("")

    const setProfileData = async (inputEmail, inputPass, inputLogin) => {

        if (inputLogin === "" || inputPass === "" || inputEmail === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!")
            return
        }

        try {
            const {user} = await signUp(inputEmail, inputPass);
            const profileData = {
                login: inputLogin,
                favoritWeather: {empty: true},
            }
            set(getUserRef(user.uid), profileData)

        } catch (err) {
            setMessageError(prev => prev = err.message)
            return
        }

        navigate("/")
    }

    return (
        <AuthForm messageError={messageError} setAuthUser={setProfileData} titleForm={"SignUp"}/>
    )
}
