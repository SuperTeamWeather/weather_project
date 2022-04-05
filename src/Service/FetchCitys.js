export const fetchCitys = async (nameCitys) => {
    return await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${nameCitys}&appid=06f902b2237e5817af2494e552d5c471&lang=ru`)
        .then(response => response.json())
        .then(dataCity => {
            return fetch("city.list.json")
                .then(data => data.json())
                .then(data => {

                    const citys = data.filter(el => {
                        return el.name === dataCity[0].name
                    })

                    return citys
                })
        })
        .catch(err => {
            return "Нет такого города"
        })
}