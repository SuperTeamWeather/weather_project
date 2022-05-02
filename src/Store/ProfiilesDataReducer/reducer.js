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
                [payload.userId]: ({ ...state[payload.userId], ["favoritesWeather"]: ([...state[payload.userId]["favoritesWeather"], payload.city]) })
            }
        default:
            return state;
    }
}