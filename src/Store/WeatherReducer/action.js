export const FETCH_WEATHER = "WEATHER::FETCH_WEATHER"
export const featchWeather = (coordinates, nameUrl, nameWeather) => ({
    type: FETCH_WEATHER,
    payload: {
        coordinates,
        nameUrl,
        nameWeather
    }


})

export const ADD_WEATHER_DATA = "WEATHER::ADD_WEATHER_DATA"
export const addWeatherData = (data) => ({
    type: ADD_WEATHER_DATA,
    payload: data
})


export const SHOW_LOADER = "WEATHER::SHOW_LOADER"
export const showLoader = (nameWeather) => ({
    type: SHOW_LOADER,
    payload: nameWeather
})


export const HIDE_LOADER = "WEATHER::HIDE_LOADER"
export const hideLoader = (nameWeather) => ({
    type: HIDE_LOADER,
    payload: nameWeather
})


export const SHOW_ALERT = "WEATHER::SHOW_ALERT"
export const showAlert = (text, nameWeather) => ({
    type: SHOW_ALERT,
    payload: { text, nameWeather }
})

export const HIDE_ALERT = "WEATHER::HIDE_ALERT"
export const hideAlert = (nameWeather) => ({
    type: HIDE_ALERT,
    payload: nameWeather
})