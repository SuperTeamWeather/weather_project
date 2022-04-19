export const FETCH_WEATHER = "WEATHER::FETCH_WEATHER"
export const featchWeather = (coordinates, nameUrl) => ({
    type: FETCH_WEATHER,
    payload: {
        coordinates,
        nameUrl
    }


})

export const ADD_WEATHER_DATA = "WEATHER::ADD_WEATHER_DATA"
export const addWeatherData = (data) => ({
    type: ADD_WEATHER_DATA,
    payload: data
})


export const SHOW_LOADER = "WEATHER::SHOW_LOADER"
export const showLoader = () => ({
    type: SHOW_LOADER
})


export const HIDE_LOADER = "WEATHER::HIDE_LOADER"
export const hideLoader = () => ({
    type: HIDE_LOADER
})


export const SHOW_ALERT = "WEATHER::SHOW_ALERT"
export const showAlert = (text) => ({
    type: SHOW_ALERT,
    payload: text
})

export const HIDE_ALERT = "WEATHER::HIDE_ALERT"
export const hideAlert = () => ({
    type: HIDE_ALERT
})