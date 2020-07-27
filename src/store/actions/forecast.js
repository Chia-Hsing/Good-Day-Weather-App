/* eslint-disable no-unused-expressions */
import * as actionTypes from './actionTypes'
import axios from '../../axios.js'

export const fetchForecastSuccess = (data) => {
    return {
        type: actionTypes.FETCH_FORECAST_SUCCESS,
        content: data,
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
            console.log(res)
            const position = res.data.location
            const res2 = await axios.get(`onecall?lat=${position.lat}&lon=${position.lng}&appid=${OWAPIKey}`)
            dispatch(fetchForecastSuccess(res2.data))
            console.log(res2.data)
        } catch (error) {
            dispatch(fetchForecastFailed(error))
        }
    }
}

export const searchCity = (location, OWAPIKey, GoogleAPIKey) => {
    return async (dispatch) => {
        try {
            let position = ''
            if (location) {
                const res = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false&language=en&key=${GoogleAPIKey}`
                )
                console.log(res)
                position = res.data.results[0].geometry.location
            }

            const res2 = await axios.get(`onecall?lat=${position.lat}&lon=${position.lng}&appid=${OWAPIKey}`)
            dispatch(fetchForecastSuccess(res2.data))
        } catch (error) {
            dispatch(fetchForecastFailed(error))
        }
    }
}
