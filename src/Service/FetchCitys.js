import { getCitiesList } from "./getCitiesList";

export const getGeoData = async (paramSearch) => {
    if (paramSearch) {
        //получаем адрес до нашего локального сервиса
        const addressServer = await getAddressToServer();
        // делаем запрос до нашего локального сервиса
        const response = await fetch(`${addressServer.server}/api/v1/geocode/geocode=${paramSearch}`)

        if (!response.ok) {
            throw new Error("С поиском города что-то пошло не так!")
        }
        const data = await response.json();
        // console.log('data: ', data);
        return getCitiesList(data);

    } else {
        console.log('Строка для поиска отсутствует');
        return 'Строка для поиска отсутствует'
    }
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