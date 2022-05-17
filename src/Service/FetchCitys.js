// export const fetchCitys = async (nameCitys) => {
//     return await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${nameCitys}&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
//         .then(response => response.json())
//         .then(dataCity => {
//             return fetch("city.list.json")
//                 .then(data => data.json())
//                 .then(data => {

//                     const citys = data.filter(el => {
//                         return el.name === dataCity[0].name
//                     })

//                     return citys
//                 })
//         })
//         .catch(err => {
//             return "Нет такого города"
//         })
// }
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

let settingsFileName = 'settings.json';
if( process.env.NODE_ENV === 'production') settingsFileName = 'settings_prod.json';

//Запрашиваем адрес до сервиса
const getAddressToServer = async () => {
    return fetch(settingsFileName)
        .then(res => res.json())
        .then(data => {
            return data
        })
}