import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from
    "../../Store/CurrentUserDataReducer/action";
import { signIn } from "../../firebase";
import { AuthForm } from "../../Components/AuthForm/AuthForm";
import "./SignInForm.scss"

export const SignInForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageError, setMessageError] = useState("");

    const setLoginAndPass = async (inputEmail, inputPass) => {

        if (inputEmail === "" || inputPass === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!");
            return;
        }


        try {
            const { user } = await signIn(inputEmail, inputPass);
            dispatch(setCurrentUser(user.uid, user.email));
        } catch (err) {
            setMessageError(prev => prev = err.message);
            return;
        }

        navigate("/");

    }

    return (
        <div className="sign-in">
            <AuthForm
                messageError={messageError}
                setAuthUser={setLoginAndPass}
                titleForm={"SignIn"} />

            <p>ИЛИ</p>
            <Link to={"/SignUp"}>
                <button className="sign-in__btn-signin">SignUp</button>
            </Link>
        </div>
    )
}