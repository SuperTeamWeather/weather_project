const success = (pos) => pos

export const getGeoCoordinatesUser = async () => {
    const defaultCoordinates = {
        coords: {
            latitude: 55.7522,
            longitude: 37.6156
        }
    };
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const result = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(success(resolve), reject, options);
    }).catch(err => {
        console.warn(err);
    });
    return result ? result : defaultCoordinates

}

