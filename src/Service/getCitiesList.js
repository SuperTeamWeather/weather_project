class CityData {
    constructor(coordinates, formattedAdress, pointDescription, pointName) {
        this.coordinates = coordinates;
        this.formattedAdress = formattedAdress;
        this.pointDescription = pointDescription;
        this.pointName = pointName;
    }
}

class Coordinates {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export const getCitiesList = (data) => {
    const geoObjectCollection = data.response.GeoObjectCollection.featureMember;
    const citiesList = [];
    const regexp = /-?\d{1,3}\.\d{4,}/g;

    geoObjectCollection.forEach(el => {
        const coordinatesArray = el.GeoObject.Point.pos.match(regexp);
        citiesList.push(new CityData(
            new Coordinates(coordinatesArray[1], coordinatesArray[0]),
            el.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
            el.GeoObject.description,
            el.GeoObject.name
        ));
    });
    // console.log(citiesList);
    return citiesList;
}