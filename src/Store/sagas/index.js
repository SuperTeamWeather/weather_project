import { all } from "redux-saga/effects"
import { watcherFetchWeather } from "./getWeatherSaga"

export function* rootWatcherSaga() {
    yield all([watcherFetchWeather()])

}