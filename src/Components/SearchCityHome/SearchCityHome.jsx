import React from "react";
import { useState } from "react";
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
import "./SearchCityHome.scss"

export const SearchCityHome = ({ getNewWeather, show, changeCity }) => {

    const [valueInput, setValueInput] = useState("")
    const [listWeatherCitys, setListWeatherCitys] = useState([])


    const hendleInput = (event) => {
        setValueInput(prev => prev = event.target.value)
    }

    const searchCity = async (event) => {
        setValueInput(prev => prev = event.target.value)
        setListWeatherCitys(await getGeoData(event.target.value))

    }

    const getNewCity = (cityItem) => {

        getNewWeather(cityItem.coordinates, _urlOpenWeather)
        getNewWeather(cityItem.coordinates, _urlYandex)
        getNewWeather(cityItem.coordinates, _urlWeatherBit)
        getNewWeather(cityItem.coordinates, _urlVisualWeather)


        setValueInput(prev => prev = "")
        setListWeatherCitys(prev => prev = [])

        changeCity();

    }

    const addToFav = () => {
        console.log('Добавить в избранное');
    }

    return (
        <div>
            <Modal show={show} onHide={changeCity}>
                <Modal.Header closeButton>
                    <Modal.Title>Найти город или район</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        onChange={hendleInput}
                        onInput={searchCity}
                        value={valueInput}
                    />

                    <ListGroup>
                        {Array.isArray(listWeatherCitys) ?
                            listWeatherCitys.map((el, idx) => {
                                return <div className="listWeatherElement" key={idx}>
                                    <Button variant="outline-primary" size="sm" onClick={addToFav}>+</Button>
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
        </div>
    )

}

