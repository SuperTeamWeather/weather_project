import { createStore, combineReducers } from "redux";
import { profilesDataReducer } from "./ProfiilesDataReducer/reducer";
import { currentUserDataReducer } from "./CurrentUserDataReducer/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "ProfilesData",
    storage,
    blacklist: ["currentUserDataReducer"],
}


const rootReducer = combineReducers({
    profilesDataReducer,
    currentUserDataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const persistor = persistStore(store)