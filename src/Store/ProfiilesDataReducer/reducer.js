import { SET_PROFILES_DATA, SET_FAVORITES } from "./action";

const initialState = {

}

export const profilesDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PROFILES_DATA:
            return {
                ...state,
                ...payload
            }

        case SET_FAVORITES:
            return {
                ...state,
                [payload.name]: ({ ...state[payload.name], ["favoritesWeather"]: ([...state[payload.name]["favoritesWeather"], payload.favorites]) })
            }
        default:
            return state;
    }
}