import React from "react";
import {useState, useRef, useEffect} from "react";
import "./AuthForm.scss";
import {Alert, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../BgAnimation/animated.scss"

export const AuthForm = ({messageError, setAuthUser, titleForm}) => {

    const inputRef = useRef(null)

    const [inputLogin, setInputLogin] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPass, setInputPass] = useState("");

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleInputLogin = (event) => {
        setInputLogin(prev => prev = event.target.value)
    }

    const handleInputEmail = (event) => {
        setInputEmail(prev => prev = event.target.value)
    }

    const handleInputPass = (event) => {
        setInputPass(prev => prev = event.target.value)
    }

    const handleFormAuthClick = (event) => {
        event.preventDefault()
        setAuthUser(inputEmail, inputPass, inputLogin)

    }
    return (
        <div className="layout-form-auth">
            <div className="form-auth">
                {titleForm === "SignUp" ?
                    <h4 className="title-form-auth">Регистрация</h4>
                    :
                    <h4 className="title-form-auth">Войти</h4>
                }
                <Form onSubmit={handleFormAuthClick} className="auth-form__form">
                    {titleForm === "SignUp" &&
                        <Form.Group className="mb-3" controlId="formBasicLogin">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control
                                ref={inputRef}
                                value={inputLogin}
                                onChange={handleInputLogin}
                                type="text"
                                placeholder="Придумайте логин"/>
                        </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            ref={titleForm === "SignIn" ? inputRef : null}
                            value={inputEmail}
                            onChange={handleInputEmail}
                            type="email"
                            placeholder="Укажите электронный адрес"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            value={inputPass}
                            onChange={handleInputPass}
                            type="password"
                            placeholder="Придумайте пароль"/>
                        <Form.Text className="text-muted">
                            Пароль должен быть длиннее 6 символов
                        </Form.Text>
                    </Form.Group>
                    {messageError &&
                        <Alert variant='warning'>
                            {messageError}
                        </Alert>}

                    {titleForm === "SignUp" ?
                        <Button variant="primary" type="submit">Зарегистрироваться</Button>
                        :
                        <Button variant="primary" type="submit">Войти</Button>
                    }
                </Form>
            </div>
        </div>

    )
}
