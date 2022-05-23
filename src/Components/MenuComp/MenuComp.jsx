import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    getSelectorCurrentUserUserData,
    getSelectorCurrentUserLoader
} from '../../Store/CurrentUserDataReducer/selectors';
import { logOut } from '../../firebase';
import { goOutUser } from '../../Store/CurrentUserDataReducer/action';
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { getDataCurrentUserFb } from '../../Store/CurrentUserDataReducer/action';
import { FavouriteCitiesList} from '../FavouriteCitiesList/FavouriteCitiesList';
import "./MenuComp.scss"


export const MenuComp = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { login } = useSelector(getSelectorCurrentUserUserData)
    const isLoader = useSelector(getSelectorCurrentUserLoader)

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        dispatch(getDataCurrentUserFb(user?.uid))

    }, [user?.uid])

    const changeCity = () => {
        setOpenModal(prev => prev = !prev);
    }

    const handleUserOutClick = async () => {
        try {
            await logOut()
            dispatch(goOutUser())
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }


    if (!isLoader) {
        return (

            <div>
                <FavouriteCitiesList show={openModal} changeCity={changeCity}></FavouriteCitiesList>
                {login
                    ? <NavDropdown title={login}>
                        <NavDropdown.Item onClick={changeCity}>
                            Избраннные города
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={handleUserOutClick}
                            href="#action/3.4">Выйти</NavDropdown.Item>
                    </NavDropdown>
                    :
                    <div>
                        <Link to={"/SignUp"} className="nav-comp__nav-btn">SignUp</Link>

                        <Link to={"/SignIn"} className="nav-comp__nav-btn">SignIn</Link>
                    </div>
                }

            </div >
        )

    } else {
        return (
            <div>
                <SkeletonTheme baseColor="#5184cc" highlightColor="#ffd21e">
                    <Skeleton height={25} width={150} />
                </SkeletonTheme>
            </div>
        )
    }
}