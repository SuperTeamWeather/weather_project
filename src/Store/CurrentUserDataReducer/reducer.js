import {
    GET_USER_LOGIN,
    GET_USER_PASSWORD,
    ACTIVE_MODAL,
    GO_OUT_USER,
    ACTIVE_BTN_MODAL,
    ACTIVE_STYLE_MODAL
} from "./action";

const initialState = {
    login: "",
    password: "",
    activeModal: false,
    activeBtnModal: "",
    activeStyleModal: "SignIn"

}

export const currentUserDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER_LOGIN:
            return {
                ...state,
                login: payload,
            }

        case GET_USER_PASSWORD:
            return {
                ...state,
                password: payload,
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
                login: "",
                password: "",
                activeBtnModal: ""
            }

        default:
            return state

    }
}