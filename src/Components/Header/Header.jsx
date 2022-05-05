import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {NavDropdown} from "react-bootstrap";
import './Header.scss'
import {CityName} from "../CityName/CityName";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getSelectorCurrentUserData} from '../../Store/CurrentUserDataReducer/selectors';
import {getSelectorProfilesDataReducer} from "../../Store/ProfiilesDataReducer/selectors"
import {logOut} from '../../firebase';
import {goOutUser} from '../../Store/CurrentUserDataReducer/action';

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {id} = useSelector(getSelectorCurrentUserData)
    const usersProfiles = useSelector(getSelectorProfilesDataReducer)

    const handleUserOutClick = async () => {
        try {
            await logOut()
            dispatch(goOutUser())
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (<header className="header">
        <div className="content content-center">
            <div className="logo-title">
                <Link to={'/'}>
                    <img className="logo" src="./img/weather-icon2.png" alt="logo"/>
                </Link>
                <CityName/>
            </div>

            <div>
                {/*   <ActionsSing/>*/}
                {usersProfiles[id]?.login
                    ? <NavDropdown title={usersProfiles[id].login}>
                        <NavDropdown.Item
                            onClick={handleUserOutClick}
                            href="#action/3.4">Выйти</NavDropdown.Item>
                    </NavDropdown>
                    :
                    <NavDropdown title="Menu">

                        <NavDropdown.Item>
                            <Link to={"/SignUp"} className="header__nav-btn">SignUp</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/SignIn"} className="header__nav-btn">SignIn</Link>
                        </NavDropdown.Item>

                        {/* <NavDropdown.Divider /> */}

                    </NavDropdown>}
            </div>
        </div>
    </header>)
}
