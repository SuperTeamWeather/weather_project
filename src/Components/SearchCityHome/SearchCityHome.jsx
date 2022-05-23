import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getGeoData } from "../../Service/FetchCitys";
import {
    _urlYandex,
    _urlVisualWeather,
    _urlWeatherBit,
    _urlOpenWeather
} from "../../Service/Constant";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    getSelectorCurrentUserUserData
} from '../../Store/CurrentUserDataReducer/selectors';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase";
import { push, set } from "firebase/database";
import { getUserFavoritesWeatherListItemRef } from "../../firebase";
import {
    setFavoritWeather,
    deleteFavoritWeather
} from "../../Store/CurrentUserDataReducer/action";
import { ListGroupItem } from "react-bootstrap";
import "./SearchCityHome.scss"



export const SearchCityHome = ({ getNewWeather, show, findCity }) => {

    const dispatch = useDispatch();
    const { login, favoritWeather } = useSelector(getSelectorCurrentUserUserData);

    const [user] = useAuthState(auth);
    const [valueInput, setValueInput] = useState("");
    const [listWeatherCitys, setListWeatherCitys] = useState([]);
    const [messageError, setMessageError] = useState("");


    const hendleInput = (event) => {
        setValueInput(prev => prev = event.target.value);
    }

    const searchCity = async (event) => {
        setValueInput(prev => prev = event.target.value);
        setListWeatherCitys(await getGeoData(event.target.value));
    }

    useEffect(() => {

        if (!show) {
            setValueInput(prev => prev = "");
            setListWeatherCitys(prev => prev = []);
            setMessageError(prev => prev = "");
        }
    }, [show])


    const getNewCity = (cityItem) => {

        getNewWeather(cityItem.coordinates, _urlOpenWeather);
        getNewWeather(cityItem.coordinates, _urlYandex);
        getNewWeather(cityItem.coordinates, _urlWeatherBit);
        getNewWeather(cityItem.coordinates, _urlVisualWeather);


        setValueInput(prev => prev = "")
        setListWeatherCitys(prev => prev = []);

        findCity();

    }

    const addToFav = (data) => {

        if (!login) {
            setMessageError(prev => prev = "Зарегистрируйтесь или войдите в ваш профиль");
            return;
        }

        push(getUserFavoritesWeatherListItemRef(user.uid, data.id), data);
        dispatch(setFavoritWeather(data));

    }

    const deleteFav = (itemId) => {

        dispatch(deleteFavoritWeather(itemId));
        set(getUserFavoritesWeatherListItemRef(user.uid, itemId), null);
    }

    const getCheckedItem = (idItem) => {
        const result = favoritWeather.find(el => {
            return el.id === idItem;
        })
        return !!result;
    }

    return (
        <div>
            <Modal show={show} onHide={findCity}>
                <Modal.Header closeButton>
                    <Modal.Title>Найти город или район</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        onChange={hendleInput}
                        onInput={searchCity}
                        value={valueInput}
                        autoFocus
                    />
                    <div
                        className="search-city__err-message">
                        {messageError}
                    </div>
                    <ListGroup>
                        {Array.isArray(listWeatherCitys) ?
                            listWeatherCitys.map((el, idx) => {
                                return <div className="listWeatherElement" key={idx}>
                                    {getCheckedItem(el.id) ?
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => deleteFav(el.id)}><i className="fa-solid fa-trash"></i></Button>
                                        :
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => addToFav(el)}>+</Button>
                                    }

                                    <ListGroup.Item
                                        action
                                        variant="light"
                                        onClick={() => getNewCity(el)}
                                    >
                                        {el.formattedAdress}
                                    </ListGroup.Item>
                                </div>
                            })
                            : <ListGroup.Item as="div" disabled>
                                Ничего не найдено
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div >
    )

}

