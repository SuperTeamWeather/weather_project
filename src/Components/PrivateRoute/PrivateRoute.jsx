import React from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveStyleModal } from "../../Store/CurrentUserDataReducer/action";
import { getSelectorCurrentUserLogin, getSelectorCurrentUserLPassword, } from "../../Store/CurrentUserDataReducer/selectors";
import { getSelectorProfilesDataReducer } from
    "../../Store/ProfiilesDataReducer/selectors";

export const PrivateRoute = () => {

    const profileData = useSelector(getSelectorProfilesDataReducer)
    const userLogin = useSelector(getSelectorCurrentUserLogin)
    const userPassword = useSelector(getSelectorCurrentUserLPassword)

    const dispatch = useDispatch()

    const handleChangeActiveModal = useCallback(() => {
        dispatch(changeActiveModal(true))
        dispatch(changeActiveBtnModal("SignIn"))
        dispatch(changeActiveStyleModal("SignIn"))

    }, [dispatch])


    useEffect(() => {
        if (!profileData.hasOwnProperty(userLogin) && profileData[userLogin]?.pass !== userPassword) {
            handleChangeActiveModal()
        }
    }, [])
    // profileData, userLogin, userPassword, handleChangeActiveModal


    if (profileData.hasOwnProperty(userLogin) && profileData[userLogin].pass === userPassword) {

        return (<Outlet />)
    } else {
        return (< Navigate to="/" replace isActive={true} />)

    }
}