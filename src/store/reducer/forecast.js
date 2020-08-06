import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../shared/utility'

const initialState = {
    currentWeather: null,
    dailyWeather: [],
    hourlyWeather: [],
    timezone: '',
    position: null,
    latLon: {},
    error: '',
    temperatureType: true,
    index: { todayEnd: null, start: null, end: null },
}

const fetchForecastSuccess = (state, action) => {
    const {
        humidity,
        sunrise,
        sunset,
        temp,
        wind_speed,
        uvi,
        feels_like,
        weather: [{ description: weatherDescription }],
        weather: [{ icon: weatherIcon }],
    } = action.weatherForecastData.current

    return updateObj(state, {
        currentWeather: {
            humidity,
            sunrise,
            sunset,
            temp,
            wind_speed,
            uvi,
            feels_like,
            weatherDescription,
            weatherIcon,
        },
        dailyWeather: action.weatherForecastData.daily,
        hourlyWeather: action.currentLocationDailyWeatherData.list,
        latLon: {
            lat: action.lat,
            lon: action.lon,
        },
        timezone: action.weatherForecastData.timezone,
        position: action.position,
        error: false,
    })
}

const fetchForecastFailed = (state, action) => {
    return updateObj(state, {
        error: action.error,
    })
}

const switchTempTypeFtoC = (state, action) => {
    return updateObj(state, {
        temperatureType: true,
    })
}

const switchTempTypeCtoF = (state, action) => {
    return updateObj(state, {
        temperatureType: false,
    })
}

const setTodayEndIndex = (state, action) => {
    return updateObj(state, {
        index: { todayEnd: action.todayEnd },
    })
}

const getIndex = (state, action) => {
    return updateObj(state, {
        index: {
            ...state.index,
            start: action.index[0],
            end: action.index[1],
        },
    })
}

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.FETCH_FORECAST_SUCCESS:
            return fetchForecastSuccess(state, action)
        case actionTypes.FETCH_FORECAST_FAILED:
            return fetchForecastFailed(state, action)
        case actionTypes.SWITCH_TEMP_TYPE_F_TO_C:
            return switchTempTypeFtoC(state, action)
        case actionTypes.SWITCH_TEMP_TYPE_C_TO_F:
            return switchTempTypeCtoF(state, action)
        case actionTypes.SET_TODAY_END_INDEX:
            return setTodayEndIndex(state, action)
        case actionTypes.GET_INDEX:
            return getIndex(state, action)
    }
    return state
}

export default reducer
