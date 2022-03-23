import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveBtnModal } from "../../Store/CurrentUserDataReducer/action";
import { changeActiveModal } from "../../Store/CurrentUserDataReducer/action";
import { getSelectorCurrentUserActiveStyleModal } from "../../Store/CurrentUserDataReducer/selectors"
import "./MyModal.scss"

export const MyModal = ({ active, children }) => {

    const dispatch = useDispatch()
    const styleModal = useSelector(getSelectorCurrentUserActiveStyleModal)

    const closeModal = () => {
        dispatch(changeActiveModal(false))
        dispatch(changeActiveBtnModal(""))
    }

    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={closeModal}
        >
            <div
                className={`modal__content-${styleModal}`}
                onClick={(ev) => ev.stopPropagation()}
            >
                {children}
            </div>
        </div >
    )
}