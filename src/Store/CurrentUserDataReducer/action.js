export const SET_CURRENT_USER = "CURRENT_USER_DATA::SET_CURRENT_USER"
export const setCurrentUser = (login, favoritWeather) => ({
    type: SET_CURRENT_USER,
    payload: {
        login,
        favoritWeather
    }
})

export const GET_DATA_CURRENT_USER_FB = "CURRENT_USER_DATA::GET_DATA_CURRENT_USER_FB"
export const getDataCurrentUserFb = (userId) => ({
    type: GET_DATA_CURRENT_USER_FB,
    payload: { userId }
})

export const SET_FAVORIT_WEATHER = "CURRENT_USER_DATA::SET_FAVORIT_WEATHER"
export const setFavoritWeather = (city) => ({
    type: SET_FAVORIT_WEATHER,
    payload: city
})

export const GO_OUT_USER = "CURRENT_USER_DATA::GO_OUT_USER"
export const goOutUser = () => ({
    type: GO_OUT_USER
})

export const DELETE_FAVORIT_WEATHER = "CURRENT_USER_DATA::DELETE_FAVORIT_WEATHER"
export const deleteFavoritWeather = (idItem) => ({
    type: DELETE_FAVORIT_WEATHER,
    payload: idItem
})


export const SHOW_LOADER_USER = "CURRENT_USER_DATA::SHOW_LOADER_USER"
export const showLoaderUser = () => ({
    type: SHOW_LOADER_USER,
})

export const HIDE_LOADER_USER = "CURRENT_USER_DATA::HIDE_LOADER_USER"
export const hideLoaderUser = () => ({
    type: HIDE_LOADER_USER,
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