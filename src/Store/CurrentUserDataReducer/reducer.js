import {
    SET_CURRENT_USER,
    SET_FAVORIT_WEATHER,
    ACTIVE_MODAL,
    GO_OUT_USER,
    ACTIVE_BTN_MODAL,
    ACTIVE_STYLE_MODAL,
    SHOW_LOADER_USER,
    HIDE_LOADER_USER,
    DELETE_FAVORIT_WEATHER
} from "./action";

const initialState = {
    userData: {
        login: "",
        favoritWeather: []
    },
    isLoader: false,
    activeModal: false,
    activeBtnModal: "",
    activeStyleModal: "SignIn",
}

export const currentUserDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                userData: ({
                    ...state["userData"], ["login"]: payload.login,
                    ["favoritWeather"]: payload.favoritWeather
                })
            }

        case SET_FAVORIT_WEATHER:
            return {
                ...state,
                userData: ({ ...state["userData"], ["favoritWeather"]: ([...state["userData"]["favoritWeather"], payload]) })
            }

        case DELETE_FAVORIT_WEATHER:
            return {
                ...state,
                userData: ({ ...state["userData"], ["favoritWeather"]: ([...state["userData"]["favoritWeather"].filter(el => el.id !== payload)]) })
            }

        case SHOW_LOADER_USER:
            return {
                ...state,
                isLoader: true
            }

        case HIDE_LOADER_USER:
            return {
                ...state,
                isLoader: false
            }

        case ACTIVE_MODAL:
            return {
                ...state,
                activeModal: payload,
            }

        case ACTIVE_BTN_MODAL:
            return {
                ...state,
                activeBtnModal: payload,
            }

        case ACTIVE_STYLE_MODAL:
            return {
                ...state,
                activeStyleModal: payload,
            }

        case GO_OUT_USER:
            return {
                ...state,
                userData: ({
                    ...state["userData"], ["login"]: "",
                    ["favoritWeather"]: []
                }),
                activeBtnModal: ""
            }

        default:
            return state

    }
}