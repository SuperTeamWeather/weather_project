import {
    ADD_WEATHER_DATA,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ALERT,
    HIDE_ALERT
} from "./action"

const initialState = {
    weather: {},
    isLoader: {},
    alert: {}

}

export const weatherReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_WEATHER_DATA:
            return {
                ...state,
                weather: ({ ...state["weather"], ...payload })
            }

        case SHOW_LOADER:
            return {
                ...state,
                isLoader: ({ ...state["isLoader"], [payload]: true })
            }

        case HIDE_LOADER:
            return {
                ...state,
                isLoader: ({ ...state["isLoader"], [payload]: false })
            }

        case SHOW_ALERT:
            return {
                ...state,
                alert: ({ ...state["alert"], [payload.nameWeather]: payload.text })
            }

        case HIDE_ALERT:
            return {
                ...state,
                alert: ({ ...state["alert"], [payload]: "" })
            }

        default:
            return state

    }
}