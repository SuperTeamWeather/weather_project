import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { currentUserDataReducer } from "./CurrentUserDataReducer/reducer";
import { profilesDataReducer } from "./ProfiilesDataReducer/reducer";
import { weatherReducer } from "./WeatherReducer/reducer";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core"
import { rootWatcherSaga } from "./sagas";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "ProfilesData",
    storage,
    blacklist: ["currentUserDataReducer", "weatherReducer"],
}


const rootReducer = combineReducers({
    profilesDataReducer,
    currentUserDataReducer,
    weatherReducer
})

const saga = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, compose(
    applyMiddleware(
        saga
    ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(rootWatcherSaga)

export const persistor = persistStore(store)