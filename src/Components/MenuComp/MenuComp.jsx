import React from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react"
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {
    getSelectorCurrentUserUserData,
    getSelectorCurrentUserLoader
} from '../../Store/CurrentUserDataReducer/selectors';
import {logOut} from '../../firebase';
import {goOutUser} from '../../Store/CurrentUserDataReducer/action';
import {auth} from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import {getDataCurrentUserFb} from '../../Store/CurrentUserDataReducer/action';
import {FavouriteCitiesList} from '../FavouriteCitiesList/FavouriteCitiesList';
import "./MenuComp.scss"
import Button from "react-bootstrap/Button";

export const MenuComp = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {login} = useSelector(getSelectorCurrentUserUserData)
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
    const loginCut = (login) => {
        if (login.length >= 10) {
            return `${login.slice(0, 10)}...`
        }
        return login
    }

    if (!isLoader) {
        return (
            <div>
                {login
                    ?
                    <React.Fragment>
                        <FavouriteCitiesList show={openModal} changeCity={changeCity}></FavouriteCitiesList>
                        <NavDropdown title={loginCut(login)}>
                            <NavDropdown.Item onClick={changeCity}>
                                Избранные города
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleUserOutClick} href="#action/3.4">
                                Выйти
                            </NavDropdown.Item>
                        </NavDropdown>
                    </React.Fragment>
                    :
                    <div className='block-btn'>
                        <Link to={"/SignUp"}>
                            <Button variant="outline-warning">Регистрация</Button>
                        </Link>
                        <Link to={"/SignIn"}>
                            <Button variant="warning">Войти</Button>
                        </Link>
                    </div>
                }
            </div>
        )

    } else {
        return (
            <div>
                <SkeletonTheme baseColor="#5184cc" highlightColor="#ffd21e">
                    <Skeleton height={25} width={150}/>
                </SkeletonTheme>
            </div>
        )
    }
}
