export const getOpenWeather = async (coordinates) => {
    if (coordinates) {
        //получаем адрес до нашего локального сервиса
        const addressServer = await getAddressToServer();
        // делаем запрос до нашего локального сервиса
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
//Запрашиваем адрес до сервиса
const getAddressToServer = async () => {
    return fetch('settings.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data
        })
}
