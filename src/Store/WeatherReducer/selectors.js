export const getSelectorWeathersData = (state => state.weatherReducer.weather)

export const getSelectorWeathersIsLoader = (state => state.weatherReducer.isLoader)

export const getSelectorWeathersAlert = (state => state.weatherReducer.alert)