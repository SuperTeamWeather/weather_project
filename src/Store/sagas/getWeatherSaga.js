import { takeEvery, call, put, delay } from "redux-saga/effects"
import {
    FETCH_WEATHER,
    addWeatherData,
    showLoader,
    hideLoader,
    showAlert,
    hideAlert
} from "../WeatherReducer/action"
import { getWeatherData } from "../../Service/GetWeather"



function* workerFetchWeather({ payload: { coordinates, nameUrl } }) {

    try {
        yield put(showLoader())
        const dataWeather = yield call(getWeatherData, coordinates, nameUrl)
        yield delay(1500)
        yield put(addWeatherData(dataWeather))
        yield put(hideLoader())
    } catch (err) {
        yield put(showAlert(err.message))
        yield delay(7000)
        yield put(hideLoader())
        yield put(hideAlert())
    }
}

export function* watcherFetchWeather() {
    yield takeEvery(FETCH_WEATHER, workerFetchWeather)
}
