import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../shared/utility'

const initialState = {
    currentWeather: null,
    dailyWeather: [],
    timezone: '',
    position: null,
    showForecast: false,
    error: '',
}

const fetchForecastSuccess = (state, action) => {
    const { humidity, sunrise, sunset, temp, wind_speed, uvi, feels_like } = action.content.current
    const weather = action.content.current.weather[0].description

    return updateObj(state, {
        currentWeather: { humidity, sunrise, sunset, temp, wind_speed, uvi, feels_like, weather },
        dailyWeather: action.content.daily,
        timezone: action.content.timezone,
        position: action.position,
        showForecast: true,
        error: false,
    })
}

const fetchForecastFailed = (state, action) => {
    return updateObj(state, {
        showForecast: false,
        error: action.error,
    })
}

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.FETCH_FORECAST_SUCCESS:
            return fetchForecastSuccess(state, action)
        case actionTypes.FETCH_FORECAST_FAILED:
            return fetchForecastFailed(state, action)
    }
    return state
}

export default reducer
