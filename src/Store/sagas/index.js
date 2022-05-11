import { all } from "redux-saga/effects"
import { watcherFetchWeather } from "./getWeatherSaga"
import { watcherGetDataCurrentUserFb } from "./getDataCurrentUserSaga"

export function* rootWatcherSaga() {
    yield all([watcherFetchWeather(), watcherGetDataCurrentUserFb()])

}