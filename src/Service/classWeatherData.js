export class WeatherData {
    constructor(cityName, temp, feelsTemp, description, windSpeed, windDirection, humidity, pressure, icon) {
        this.cityName = cityName;
        this.temp = temp;
        this.feelsTemp = feelsTemp;
        this.description = description;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.humidity = humidity;
        this.pressure = pressure;
        this.icon = icon;
    }

    getWindDirText() {
        const windDirText = ["С", "ССВ", "СВ", "ВСВ", "В", "ВЮВ", "ЮВ", "ЮЮВ", "Ю", "ЮЮЗ", "ЮЗ", "ЗЮЗ", "З", "ЗСЗ", "СЗ", "ССЗ", "С"]
        return windDirText[Math.round(this.windDirection / 22.5)]
    }


    getWindDirTextYandex() {
        switch (this.windDirection) {
            case "nw":
                return "СЗ"
            case "n":
                return "С"
            case "ne":
                return "СВ"
            case "e":
                return "В"
            case "se":
                return "ЮВ"
            case "s":
                return "Ю"
            case "sw":
                return "ЮЗ"
            case "w":
                return "З"
            case "c":
                return "штиль"
            default:
                return ""
        }
    }
}