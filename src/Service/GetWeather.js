export const getWeatherFromWebService = async (coordinates, sourceName) => {
    if (coordinates) {
        //получаем адрес до нашего локального сервиса
        const addressServer = await getAddressToServer();
        // делаем запрос до нашего локального сервиса
        return fetch(`${addressServer.server}/api/v1/${sourceName}/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)
            .then(response => response.json())
            .then(data => {
                    //console.log(data);
                    return data
                }
            )
    } else
        return 'Координаты отсутствуют'
}

//Запрашиваем адрес до сервиса
const getAddressToServer = async () => {
    return fetch('settings.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data
        })
}

// OpenWeatherMap source
// пока используется для поиска по названию города
export const getOpenWeather = async (coordinates) => {
    if (coordinates) {
        const addressServer = await getAddressToServer();
        return fetch(`${addressServer.server}/api/v1/OpenWeather/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)
            .then(response => response.json())
            .then(data => {
                    //console.log(data);
                    return data
                }
            )
    } else
        return 'Координаты отсутствуют'
}

// // WeatherBit source
// export const getWeatherBit = async (coordinates) => {
//     if (coordinates) {
//         const addressServer = await getAddressToServer();
//         return fetch(`${addressServer.server}/api/v1/WeatherBit/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)
//             .then(response => response.json())
//             .then(data => {
//                     //console.log(data);
//                     return data
//                 }
//             )
//     } else
//         return 'Координаты отсутствуют'
// }

// // Visual crossing source
// export const getVisualcrossingWeather = async (coordinates) => {
//     if (coordinates) {
//         const addressServer = await getAddressToServer();
//         return fetch(`${addressServer.server}/api/v1/VisualcrossingWeather/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)
//             .then(response => response.json())
//             .then(data => {
//                     //console.log(data);
//                     return data
//                 }
//             )
//     } else
//         return 'Координаты отсутствуют'
// }

// // Yandex source
// export const getYandexWeather = async (coordinates) => {
//     if (coordinates) {
//         const addressServer = await getAddressToServer();
//         return fetch(`${addressServer.server}/api/v1/YandexWeather/lat=${coordinates.latitude}&lot=${coordinates.longitude}`)
//             .then(response => response.json())
//             .then(data => {
//                     //console.log(data);
//                     return data
//                 }
//             )
//     } else
//         return 'Координаты отсутствуют'
// }
