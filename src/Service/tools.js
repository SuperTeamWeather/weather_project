import {Sun} from "../Components/SVGIcons/SvgDescription/Sun/Sun";
import {SunAndCloud} from "../Components/SVGIcons/SvgDescription/SunAndCloud/SunAndCloud";
import {Cloud} from "../Components/SVGIcons/SvgDescription/Cloud/Cloud";
import {Rain} from "../Components/SVGIcons/SvgDescription/Rain/Rain";
import {Snow} from "../Components/SVGIcons/SvgDescription/Snow/Snow";

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
        case "01d":
            return <Sun/>
        case "01n":
            return <Sun/>

        case "02d":
            return <SunAndCloud/>
        case "02n":
            return <SunAndCloud/>

        case "03d":
            return <Cloud/>
        case "03n":
            return <Cloud/>
        case "04d":
            return <Cloud/>
        case "04n":
            return <Cloud/>

        case "09d":
            return <Rain/>
        case "09n":
            return <Rain/>
        case "10d":
            return <Rain/>
        case "10n":
            return <Rain/>
        case "11d":
            return <Rain/>
        case "11n":
            return <Rain/>

        case "13d" || "13n":
            return <Snow/>
        case "13n":
            return <Snow/>

        default:
            return ""
    }
}


export const getWindDirText = (windDirDegree) => {
    const windDirText = ["С", "ССВ", "СВ", "ВСВ", "В", "ВЮВ", "ЮВ", "ЮЮВ", "Ю", "ЮЮЗ", "ЮЗ", "ЗЮЗ", "З", "ЗСЗ", "СЗ", "ССЗ", "С"]
    return windDirText[Math.round(windDirDegree / 22.5)]
}

export const getWindDirTextYandex = (windDir) => {
    switch (windDir) {
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

export const getRusWeatherConditionYandex = (condition) => {
    switch (condition) {
        case "clear ":
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
        case "rain ":
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