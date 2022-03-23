import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfilesData } from "../../Store/ProfiilesDataReducer/action";
import { getSelectorProfilesDataReducer } from
    "../../Store/ProfiilesDataReducer/selectors";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveStyleModal } from "../../Store/CurrentUserDataReducer/action";
import "./SignUpForm.scss"

export const SignUpForm = () => {

    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const profileData = useSelector(getSelectorProfilesDataReducer);

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

    const setProfileData = (event) => {
        event.preventDefault()

        if (inputLogin === "" || inputPass === "") {
            setMessageError(prev => prev = "Поля ввода не должны быть пустые!")
            return
        }

        if (profileData.hasOwnProperty(inputLogin)) {
            setMessageError(prev => prev = "Такой логин уже существует, выбирит едругой")
            return
        }
        const prifileData = {
            [inputLogin]: {
                pass: inputPass,
                favoritesWeather: []
            }
        }

        dispatch(setProfilesData(prifileData))

        setInputLogin(prev => prev = "")
        setInputPass(prev => prev = "")
        setMessageError(prev => prev = "")

        dispatch(changeActiveModal(false))

    }

    const changeModal = (event) => {
        dispatch(changeActiveBtnModal(event.target.textContent))
        dispatch(changeActiveStyleModal(event.target.textContent))
    }


    // const setFavor = () => {
    //     const aaa = {
    //         nameProfile: "Alex",
    //         citys: {
    //             id: 123,
    //             name: "JJJJJ"
    //         }
    //     }
    //     console.log(aaa)

    //     dispatch(setFavorites(aaa))
    // }


    return (
        <div className="sign-up">
            <form onSubmit={setProfileData} className="sign-up__form">
                <h4 className="sign-up__title">SignUp:</h4>
                <p><input
                    ref={inputRef}
                    value={inputLogin}
                    placeholder="login"
                    className="sign-up__input"
                    onChange={hendleInputLogin}
                    type="text" /></p>

                <p><input
                    className="sign-up__input"
                    onChange={hendleInputPass}
                    placeholder="password"
                    value={inputPass}
                    type="password" /></p>
                <div className="sign-up__message-error">{messageError}</div>

                <button className="sign-up__btn" type="submit">Зарегистрироваться</button>
            </form>

            <p>ИЛИ</p>

            <button onClick={changeModal} className="sign-up__btn-signin">SignIn</button>
        </div>
    )
}