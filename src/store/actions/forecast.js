/* eslint-disable no-unused-expressions */
import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchForecastSuccess = (data, position, lat, lon) => {
    return {
        type: actionTypes.FETCH_FORECAST_SUCCESS,
        content: data,
        position: position,
        lat: lat,
        lon: lon,
    }
}

export const fetchForecastFailed = (error) => {
    return {
        type: actionTypes.FETCH_FORECAST_FAILED,
        error: error.message,
    }
}

export const switchTempTypeFtoC = () => {
    return {
        type: actionTypes.SWITCH_TEMP_TYPE_F_TO_C,
    }
}

export const switchTempTypeCtoF = () => {
    return {
        type: actionTypes.SWITCH_TEMP_TYPE_C_TO_F,
    }
}

export const fetchHourlyForecastSuccess = (data) => {
    return {
        type: actionTypes.FETCH_HOURLY_FORECAST_SUCCESS,
        content: data,
    }
}

export const fetchHourlyForecastFailed = (error) => {
    return {
        type: actionTypes.FETCH_HOURLY_FORECAST_FAILED,
        error: error.message,
    }
}

//* global variables

export const currentLocationSearch = (OWAPIKey, GoogleAPIKey) => {
    return async (dispatch) => {
        try {
            const latLon = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GoogleAPIKey}`)
            const currentLatitude = latLon.data.location.lat
            const currentLongitude = latLon.data.location.lng
            const weatherForecastData = await axios.get(
                `http://api.openweathermap.org/data/2.5/onecall?lat=${currentLatitude}&lon=${currentLongitude}&appid=${OWAPIKey}`
            )
            const currentLocation = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLatitude},${currentLongitude}&result_type=administrative_area_level_3&key=${GoogleAPIKey}`
            )
            const {
                data: {
                    results: [{ formatted_address: position }],
                },
            } = currentLocation
            dispatch(fetchForecastSuccess(weatherForecastData.data, position, currentLatitude, currentLongitude))
        } catch (error) {
            dispatch(fetchForecastFailed(error))
        }
    }
}

export const citySearch = (location, OWAPIKey, GoogleAPIKey) => {
    return async (dispatch) => {
        try {
            if (location) {
                const locationData = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&result_type=political&key=${GoogleAPIKey}`
                )
                if (locationData.data.results.length > 0) {
                    const {
                        data: {
                            results: [
                                {
                                    geometry: {
                                        location: { lat: latitude, lng: longitude },
                                    },
                                    formatted_address: position,
                                },
                            ],
                        },
                    } = locationData

                    const weatherForecastData = await axios.get(
                        `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${OWAPIKey}`
                    )
                    dispatch(fetchForecastSuccess(weatherForecastData.data, position, latitude, longitude))
                }
            }
        } catch (error) {
            dispatch(fetchForecastFailed(error))
        }
    }
}

export const currentLocationHourlyWeatherSearch = (OWAPIKey, latitude, longitude) => {
    return async (dispatch, getState) => {
        try {
            const currentLocationDailyWeatherData = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OWAPIKey}`
            )
            dispatch(fetchHourlyForecastSuccess(currentLocationDailyWeatherData))
        } catch (error) {
            dispatch(fetchHourlyForecastFailed(error))
        }
    }
}

export const getIndex = (start, end) => {
    return {
        type: actionTypes.GET_INDEX,
        index: [start, end],
    }
}

export const todayHourlyWeatherInit = (todayEnd) => {
    return {
        type: actionTypes.TODAY_HOURLY_WEATHER_INIT,
        index: todayEnd,
    }
}
