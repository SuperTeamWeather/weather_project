export const SET_CURRENT_USER = "CURRENT_USER_DATA::SET_CURRENT_USER"
export const setCurrentUser = (id, email) => ({
    type: SET_CURRENT_USER,
    payload: {
        id,
        email
    }
})


// export const GET_USER_LOGIN = "CURRENT_USER_DATA::GET_USER_LOGIN"
// export const getUserLogin = (login) => ({
//     type: GET_USER_LOGIN,
//     payload: login,
// })

// export const GET_USER_PASSWORD = "CURRENT_USER_DATA::GET_USER_PASSWORD"
// export const getUserPassword = (pass) => ({
//     type: GET_USER_PASSWORD,
//     payload: pass,
// })

export const GO_OUT_USER = "CURRENT_USER_DATA::GO_OUT_USER"
export const goOutUser = () => ({
    type: GO_OUT_USER
})


export const ACTIVE_MODAL = "CURRENT_USER_DATA::ACTIVE_MODAL"
export const changeActiveModal = (flag) => ({
    type: ACTIVE_MODAL,
    payload: flag,
})

export const ACTIVE_BTN_MODAL = "CURRENT_USER_DATA::ACTIVE_BTN_MODAL"
export const changeActiveBtnModal = (btnName) => ({
    type: ACTIVE_BTN_MODAL,
    payload: btnName,
})

export const ACTIVE_STYLE_MODAL = "CURRENT_USER_DATA::ACTIVE_STYLE_MODAL";
export const changeActiveStyleModal = (styleName) => ({
    type: ACTIVE_STYLE_MODAL,
    payload: styleName
})