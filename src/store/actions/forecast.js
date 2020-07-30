/* eslint-disable no-unused-expressions */
import * as actionTypes from './actionTypes'
import axios from '../../axios.js'

export const fetchForecastSuccess = (data, position) => {
    return {
        type: actionTypes.FETCH_FORECAST_SUCCESS,
        content: data,
        position: position,
    }
}

export const fetchForecastFailed = (error) => {
    return {
        type: actionTypes.FETCH_FORECAST_FAILED,
        error: error.message,
    }
}

export const searchCurrentLocation = (OWAPIKey, GoogleAPIKey) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GoogleAPIKey}`)
            const latitude = res.data.location.lat
            const longitude = res.data.location.lng
            const res2 = await axios.get(`onecall?lat=${latitude}&lon=${longitude}&appid=${OWAPIKey}`)
            const res3 = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=administrative_area_level_3&key=${GoogleAPIKey}`
            )
            const position = res3.data.results[0].formatted_address
            dispatch(fetchForecastSuccess(res2.data, position))
        } catch (error) {
            dispatch(fetchForecastFailed(error))
        }
    }
}

export const searchCity = (location, OWAPIKey, GoogleAPIKey) => {
    return async (dispatch) => {
        try {
            let position = '',
                latitude = '',
                longitude = ''
            if (location) {
                const res = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&result_type=political&key=${GoogleAPIKey}`
                )
                if (res.data.results.length > 0) {
                    latitude = res.data.results[0].geometry.location.lat
                    longitude = res.data.results[0].geometry.location.lng
                    position = res.data.results[0].formatted_address
                    const res2 = await axios.get(`onecall?lat=${latitude}&lon=${longitude}&appid=${OWAPIKey}`)
                    dispatch(fetchForecastSuccess(res2.data, position))
                }
            }
        } catch (error) {
            dispatch(fetchForecastFailed(error))
        }
    }
}
