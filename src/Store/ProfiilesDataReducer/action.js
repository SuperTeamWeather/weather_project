export const SET_PROFILES_DATA = "PROFILES_DATA::SET_PROFILES_DATA";
export const setProfilesData = (data) => ({
    type: SET_PROFILES_DATA,
    payload: data,
})

export const SET_FAVORITES = "PROFILES_DATA::SET_FAVORITES";
export const setFavorites = (userId, city) => ({
    type: SET_FAVORITES,
    payload: {
        userId,
        city
    },
})