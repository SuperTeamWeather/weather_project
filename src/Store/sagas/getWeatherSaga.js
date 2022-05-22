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

function* workerFetchWeather({ payload: { coordinates, nameUrl, nameWeather } }) {

    try {
        yield put(showLoader(nameWeather))
        const dataWeather = yield call(getWeatherData, coordinates, nameUrl)
        yield put(addWeatherData(dataWeather))
        yield put(hideLoader(nameWeather))
    } catch (err) {
        yield put(hideLoader(nameWeather))
        yield put(showAlert(err.message, nameWeather))
        yield delay(3000)
        yield put(hideAlert(nameWeather))
    }
}

export function* watcherFetchWeather() {
    yield takeEvery(FETCH_WEATHER, workerFetchWeather)
}
