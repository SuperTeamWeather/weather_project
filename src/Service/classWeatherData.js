export class WeatherData {
    constructor(cityName, temp, feelsTemp, description, windSpeed, windDirection, humidity, pressure, icon, tempMin, tempMax) {
        this.cityName = cityName;
        this.temp = temp;
        this.feelsTemp = feelsTemp;
        this.description = description;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.humidity = humidity;
        this.pressure = pressure;
        this.icon = icon;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
    }

    add(key, value) {
        this[key] = value;

    }
}

export class WeatherDataHourly {
    constructor(time, temp, icon) {
        this.time = time;
        this.temp = temp;
        this.icon = icon;
    }
}

export class WeatherDataDaily {
    constructor(temp, tempMin, tempMax, description, windSpeed, windDirection, humidity, pressure, icon, day, dayOfWeek) {
        this.temp = temp;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.description = description;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.humidity = humidity;
        this.pressure = pressure;
        this.icon = icon;
        this.day = day;
        this.dayOfWeek = dayOfWeek;
    }
}