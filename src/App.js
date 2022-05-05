import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from "./Store"
import {PersistGate} from 'redux-persist/integration/react';
import {AppsRoutes} from './Components/AppsRoutes/AppsRoutes'
import Normalize from 'react-normalize';
import "./App.scss"
import {HTMLTitle} from "./Components/Html_title/HtmlTitle";
import {_urlYandex} from "./Service/Constant";

function App () {
    return (
        <div className='app background'>
            <Normalize/>
            <Provider store={store}>
                <HTMLTitle nameWeatherUrl={_urlYandex}/>
                <PersistGate persistor={persistor}>
                    <AppsRoutes/>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;


