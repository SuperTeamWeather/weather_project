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

    return `${addLeadingZero(month + 1)}.${addLeadingZero(day)}.${year}  ${getWeek(currentDate.getDay())} ${addLeadingZero(hours)}:${addLeadingZero(minutes)}`

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
