import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../shared/utility'

import timeFormat from '../../shared/timeConverter'

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
    } = action.content.current

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
        dailyWeather: action.content.daily,
        latLon: {
            lat: action.lat,
            lon: action.lon,
        },
        timezone: action.content.timezone,
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

const fetchHourlyForecastSuccess = (state, action) => {
    const hourlyWeatherData = [...action.content.data.list]

    const timeArray = []
    hourlyWeatherData.slice(0, 8).map((item) => {
        const time = timeFormat(item.dt, state.timezone, 'H')
        return timeArray.push(Number(time))
    })

    console.log(timeArray, hourlyWeatherData, state.timezone)
    let todayEnd = null
    if (timeArray.indexOf(0) !== -1) {
        todayEnd = timeArray.indexOf(23)
    } else if (timeArray.indexOf(22) !== -1) {
        todayEnd = timeArray.indexOf(22)
    } else {
        todayEnd = timeArray.indexOf(23)
    }

    return updateObj(state, { hourlyWeather: hourlyWeatherData, index: { todayEnd: todayEnd + 1 } })
}

const fetchHourlyForecastFailed = (state, action) => {
    return updateObj(state, {
        error: action.error,
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

const todayHourlyWeatherInit = (state, action) => {
    return updateObj(state, {
        index: {
            todayEnd: action.index,
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
        case actionTypes.FETCH_HOURLY_FORECAST_SUCCESS:
            return fetchHourlyForecastSuccess(state, action)
        case actionTypes.FETCH_HOURLY_FORECAST_FAILED:
            return fetchHourlyForecastFailed(state, action)
        case actionTypes.GET_INDEX:
            return getIndex(state, action)
        case actionTypes.TODAY_HOURLY_WEATHER_INIT:
            return todayHourlyWeatherInit(state, action)
    }
    return state
}

export default reducer
