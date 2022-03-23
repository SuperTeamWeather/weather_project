import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from "./Store"
import { Home } from './Pages/Home/Home'
import { Header } from './Components/Header/Header';
import { Profile } from './Pages/Profile/Profile';
import { WeatherItem } from './Pages/WeatherItem/WeatherItem';
import { WeatherSearch } from './Pages/WeatherSearch/WeatherSearch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute"
import { PersistGate } from 'redux-persist/integration/react';
import "./App.scss"


function App() {
  console.log("start");
  return (
    <div className='app'>
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />

              <Route path='weather' element={<PrivateRoute />}>
                <Route path='' element={<WeatherSearch />} />
              </Route>

              <Route path='weather/:id' element={<WeatherItem />} />

              <Route path='profile' element={<PrivateRoute />}>
                <Route path='' element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>

      </Provider>

    </div>
  );
}

export default App;
