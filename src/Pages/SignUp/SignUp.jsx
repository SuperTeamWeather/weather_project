import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setProfilesData } from "../../Store/ProfiilesDataReducer/action";
import { setCurrentUser } from "../../Store/CurrentUserDataReducer/action";
import { signUp } from "../../firebase";
import { AuthForm } from "../../Components/AuthForm/AuthForm";
import "./SignUp.scss"


export const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [messageError, setMessageError] = useState("")

    const setProfileData = async (inputEmail, inputPass, inputLogin) => {

        if (inputLogin === "" || inputPass === "" || inputEmail === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!")
            return
        }

        try {
            const { user } = await signUp(inputEmail, inputPass);
            const profileData = {
                [user.uid]: {
                    login: inputLogin,
                    favoritesWeather: []
                }
            }
            dispatch(setProfilesData(profileData))
            dispatch(setCurrentUser(user.uid, user.email));
        } catch (err) {
            setMessageError(prev => prev = err.message)
            return
        }

        navigate("/")
    }


    // const setFavor = () => {
    //    
    //         userId: "Alex",
    //         city: {
    //             id: 123,
    //             name: "Москва"
    //         }
    //     
    //   

    //     dispatch(setFavorites(userId,city))
    // }


    return (
        <div className="sign-up">
            <AuthForm
                messageError={messageError}
                setAuthUser={setProfileData}
                titleForm={"SignUp"} />

            <p>ИЛИ</p>
            <Link to={"/SignIn"}>
                <button className="sign-up__btn-signin">SignIn</button>
            </Link>
        </div>
    )
}