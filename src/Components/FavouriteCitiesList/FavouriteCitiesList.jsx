import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import {
    _urlYandex,
    _urlVisualWeather,
    _urlWeatherBit,
    _urlOpenWeather
} from "../../Service/Constant";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    getSelectorCurrentUserUserData
} from '../../Store/CurrentUserDataReducer/selectors';
import { featchWeather } from "../../Store/WeatherReducer/action";
import "./FavouriteCitiesList.scss"



export const FavouriteCitiesList = ({ show, changeCity }) => {

    const dispatch = useDispatch();
    const { login, favoritWeather } = useSelector(getSelectorCurrentUserUserData);

    const getNewWeather = useCallback(async (cityCoord, urlName) => {
        dispatch(featchWeather(cityCoord, urlName))
    }, [dispatch])


    const getNewCity = (cityItem) => {
        
        getNewWeather(cityItem.coordinates, _urlOpenWeather);
        getNewWeather(cityItem.coordinates, _urlYandex);
        getNewWeather(cityItem.coordinates, _urlWeatherBit);
        getNewWeather(cityItem.coordinates, _urlVisualWeather);

        changeCity();
    }

    const deleteFav = (itemId) => {
        console.log('Удалено из избранного');
    }

    return (
        <div>
            <Modal show={show} onHide={changeCity}>
                <Modal.Header closeButton>
                    <Modal.Title>Избранные города</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {favoritWeather.length >= 1 ?
                            favoritWeather.map((el, idx) => {
                                return <div className="listElement" key={idx}>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => deleteFav(el.id)}><i className="fa-solid fa-trash"></i></Button>

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
                                Список избранного пуст
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div >
    )

}

