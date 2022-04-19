import {
    ADD_WEATHER_DATA,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ALERT,
    HIDE_ALERT
} from "./action"

const initialState = {
    weather: {},
    isLoader: false,
    alert: null

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
                isLoader: true
            }

        case HIDE_LOADER:
            return {
                ...state,
                isLoader: false
            }

        case SHOW_ALERT:
            return {
                ...state,
                alert: payload
            }

        case HIDE_ALERT:
            return {
                ...state,
                alert: null
            }

        default:
            return state

    }
}