import { getUnitedWeatherData } from "./getUnitedWeatherData";


// export const getWeatherData = async (coordinates, weatherName) => {
//     if (coordinates) {
//         //получаем адрес до нашего локального сервиса
//         const addressServer = await getAddressToServer();
//         // делаем запрос до нашего локального сервиса
//         return fetch(`${addressServer.server}/${weatherName}/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)
//             .then(response => response.json())
//             .then(data => {
//                 // console.log(data);
//                 return getUnitedWeatherData(data, weatherName)
//             })
//     } else
//         return 'Координаты отсутствуют'
// }

export const getWeatherData = async (coordinates, weatherName) => {
    if (coordinates) {
        //получаем адрес до нашего локального сервиса
        const addressServer = await getAddressToServer();
        // делаем запрос до нашего локального сервиса
        const response = await fetch(`${addressServer.server}/${weatherName}/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)

        if (!response.ok) {
            throw new Error("Что-то пошло не так!")
        }
        const data = await response.json()
        return getUnitedWeatherData(data, weatherName)

    } else
        return 'Координаты отсутствуют'
}



//Запрашиваем адрес до сервиса
const getAddressToServer = async () => {
    return fetch('settings.json')
        .then(res => res.json())
        .then(data => {
            return data
        })
}
