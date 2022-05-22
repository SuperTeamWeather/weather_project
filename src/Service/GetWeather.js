import { getUnitedWeatherData } from "./getUnitedWeatherData";


export const getWeatherData = async (coordinates, weatherNameUrl) => {
    if (coordinates) {
        //получаем адрес до нашего локального сервиса
        const addressServer = await getAddressToServer();
        // делаем запрос до нашего локального сервиса
        const response = await fetch(`${addressServer.server}/${weatherNameUrl}/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)

        if (!response.ok) {
            throw new Error("Что-то пошло не так!")
        }
        const data = await response.json();
        // console.log(weatherNameUrl, data);
        return getUnitedWeatherData(data, weatherNameUrl)

    } else
        return 'Координаты отсутствуют'
}

const pathToSettingsFile = '/';
let settingsFileName = 'settings.json';
if( process.env.NODE_ENV === 'production') settingsFileName = 'settings_prod.json';

const fullPathToSettings = pathToSettingsFile + settingsFileName;

//Запрашиваем адрес до сервиса
const getAddressToServer = async () => {
    return fetch(fullPathToSettings)
        .then(res => res.json())
        .then(data => {
            return data
        })
}
