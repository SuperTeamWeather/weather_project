import { Sun } from "../Components/SVGIcons/SvgDescription/Sun/Sun";
import { SunAndCloud } from "../Components/SVGIcons/SvgDescription/SunAndCloud/SunAndCloud";
import { Cloud } from "../Components/SVGIcons/SvgDescription/Cloud/Cloud";
import { Rain } from "../Components/SVGIcons/SvgDescription/Rain/Rain";
import { Snow } from "../Components/SVGIcons/SvgDescription/Snow/Snow";
import { SnowAndRain } from "../Components/SVGIcons/SvgDescription/SnowAndRain/SnowAndRain";



export const getNameWeatherFromRegExp = (urlName) => {
    const reg = /api\/v1\//gi;
    return urlName.replace(reg, "")

}

const getWeek = (week) => {
    switch (week) {
        case 0:
            return "Воскресение"

        case 1:
            return "Понедельник"

        case 2:
            return "Вторник"

        case 3:
            return "Среда"

        case 4:
            return "Четверг"

        case 5:
            return "Пятница"

        case 6:
            return "Суббота"

        default:
            return ""
    }
}
export const getCurrentTime = (currentDate) => {
    const addLeadingZero = (d) => {
        return (d < 10) ? "0" + d : d
    }

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes()
    const month = currentDate.getMonth()
    const day = currentDate.getDate()
    const year = currentDate.getFullYear()

    return `${addLeadingZero(day)}.${addLeadingZero(month + 1)}.${year}  ${getWeek(currentDate.getDay())} ${addLeadingZero(hours)}:${addLeadingZero(minutes)}`

}
export const getLogoWeatherDescription = (logo) => {
    switch (logo) {
        case "01d": case "01n": case "c01d": case "c01n": case "clear-day":
        case "clear-night":
            return <Sun />


        case "02d": case "02n": case "c02d": case "c02n": case "partly-cloudy-day": case "partly-cloudy-night":
            return <SunAndCloud />


        case "03d": case "03n": case "c04d": case "c04n": case "c03d": case "c03n":
        case "04d": case "04n": case "a06d": case "a06n": case "a05d": case "a05n":
        case "a04d": case "a04n": case "a03d": case "a03dn": case "a02d": case "a02n":
        case "a01d": case "a01dn": case "fog": case "wind": case "cloudy":
            return <Cloud />


        case "09d": case "09n": case "10d": case "10n": case "11d": case "11n":
        case "r06d": case "r06n": case "r05d": case "r05n": case "r04d": case "r04n":
        case "r03d": case "r03n": case "r02d": case "r02n": case "r01d": case "r01n":
        case "d01d": case "d01n": case "t05d": case "t05n": case "t04d": case "t04n":
        case "t03d": case "t03n": case "t02d": case "t02n": case "t01d": case "t01n":
        case "rain": case "thunder-rain": case "thunder-showers-day":
        case "thunder-showers-night": case "showers-day": case "showers-night":
            return <Rain />


        case "13d": case "13n": case "s06d": case "s06n": case "s02d": case "s02n":
        case "s01d": case "s01n": case "s05d": case "s05n": case "s03d": case "s03n": case "snow": case "snow-showers-day":
        case "snow-showers-night":
            return <Snow />


        case "u00d": case "u00n": case "s04d": case "s04n": case "f01d": case "f01n":
            return <SnowAndRain />


        default:
            return ""
    }
}


export const getLogoFromYandex = (description) => {

    switch (description) {

        case "Ясно":
            return <Sun />

        case "Малооблачно":
            return <SunAndCloud />

        case "Облачно с прояснениями": case "Пасмурно":
            return <Cloud />

        case "Морось": case "Небольшой дождь": case "Дождь": case "Ливень":
        case "Умеренно сильный дождь": case "Сильный дождь":
        case "Длительный сильный дождь": case "Гроза": case "Дождь с грозой":
            return <Rain />

        case "Небольшой снег": case "Снег": case "Снегопад":
            return <Snow />

        case "Дождь со снегом": case "Град": case "Гроза с градом":
            return <SnowAndRain />

        default:
            return ""
    }

}


export const getRusWeatherConditionYandex = (condition) => {
    switch (condition) {
        case "clear":
            return "Ясно"
        case "partly-cloudy":
            return "Малооблачно"
        case "cloudy":
            return "Облачно с прояснениями"
        case "overcast":
            return "Пасмурно"
        case "drizzle":
            return "Морось"
        case "light-rain":
            return "Небольшой дождь"
        case "rain":
            return "Дождь"
        case "moderate-rain":
            return "Умеренно сильный дождь"
        case "heavy-rain":
            return "Сильный дождь"
        case "continuous-heavy-rain":
            return "Длительный сильный дождь"
        case "showers":
            return "Ливень"
        case "wet-snow":
            return "Дождь со снегом"
        case "light-snow":
            return "Небольшой снег"
        case "snow":
            return "Снег"
        case "snow-showers":
            return "Снегопад"
        case "hail":
            return "Град"
        case "thunderstorm":
            return "Гроза"
        case "thunderstorm-with-rain":
            return "Дождь с грозой"
        case "thunderstorm-with-hail":
            return "Гроза с градом"
        default:
            return ""
    }
}