import { takeEvery, call, put } from "redux-saga/effects"
import {
    GET_DATA_CURRENT_USER_FB, setCurrentUser, showLoaderUser,
    hideLoaderUser
} from "../CurrentUserDataReducer/action"
import { onValue } from 'firebase/database';
import { getUserRef, getUserFavoritesWeatherRef } from '../../firebase';


function* workerGetDataCurrentUserFb({ payload: { userId } }) {

    if (userId) {
        yield put(showLoaderUser())
        const login = yield call(getUserLogin, userId)
        const favoritWeather = yield call(getFavoritWeather, userId)
        yield put(setCurrentUser(login, favoritWeather))
        yield put(hideLoaderUser())
    } else return
}


export function* watcherGetDataCurrentUserFb() {
    yield takeEvery(GET_DATA_CURRENT_USER_FB, workerGetDataCurrentUserFb)
}


const getUserLogin = (userId) => {
    return new Promise((resolve, reject) => {
        onValue(getUserRef(userId), (snapshot) => {
            let userLogin = ""
            snapshot.forEach(el => {
                userLogin = el.val() || ""
            })
            resolve(userLogin)
        })
    })

}


const getFavoritWeather = (userId) => {
    return new Promise((resolve, reject) => {
        onValue(getUserFavoritesWeatherRef(userId), (snapshot) => {
            let favoritWeather = []
            snapshot.forEach(el => {

                if (Object.values(el.val())) {

                    favoritWeather.push(...Object.values(el.val()))

                } else return;
            })
            resolve(favoritWeather)
        })
    })
}