/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import CurrentWeather from './currentWeather'
import Aux from '../../HOC/Aux'
import { kTOC, kTOF } from '../../shared/tempConverter'
import timeFormat from '../../shared/timeConverter'

const CurrentWeatherWrap = (props) => {
    useEffect(() => {
        const timeArray = []
        // Separate the first eight Object from props.hourlyWeather and convert each timestamp to hour then put they into a array. [0, 3, 6, 9 , 12, 15 ...] By find out the final hour's index of the day (22, 23 or 0) to determine how many hourly items should be presented.
        props.hourlyWeather.slice(0, 8).map((item) => {
            const time = timeFormat(item.dt, props.timezone, 'H')
            return timeArray.push(Number(time))
        })
        let todayEnd = null
        if (timeArray.indexOf(0) !== -1) {
            todayEnd = timeArray.indexOf(0)
        } else if (timeArray.indexOf(22) !== -1) {
            todayEnd = timeArray.indexOf(22)
        } else {
            todayEnd = timeArray.indexOf(23)
        }

        props.onSetTodayEndIndex(todayEnd + 1)

        // only when timezone changed, the component go rendering. (while search location)
    }, [props.timezone])

    const {
        humidity,
        temp,
        wind_speed,
        uvi,
        feels_like,
        weatherDescription,
        sunrise,
        sunset,
        weatherIcon,
    } = props.currentWeather
    const sunriseTime = timeFormat(sunrise, props.timezone, 'h:mm a')
    const sunsetTime = timeFormat(sunset, props.timezone, 'h:mm a')

    //* Get the timestamp of current time.
    const currentTimeStamp = new Date().getTime() / 1000
    const currentTime = timeFormat(currentTimeStamp, props.timezone, 'MMMM Do YYYY HH:mm')

    //* Swift temperature type and change the button color.
    let temperature = 0,
        feelsLike = ''

    if (props.temperatureType) {
        temperature = kTOC(temp)
        feelsLike = kTOC(feels_like)
    } else {
        temperature = kTOF(temp)
        feelsLike = kTOF(feels_like)
    }
    //* ------------------------------
    return (
        <Aux>
            <CurrentWeather
                hourlyWeather={props.hourlyWeather}
                timezone={props.timezone}
                humidity={humidity}
                temp={temperature}
                wind_speed={wind_speed}
                uvi={uvi}
                weatherDescription={weatherDescription}
                weatherIcon={weatherIcon}
                sunriseTime={sunriseTime}
                sunsetTime={sunsetTime}
                feelsLike={feelsLike}
                timeShown={currentTime}
                cityShown={props.position}
                switchFtoC={props.onSwitchTempTypeFtoC}
                switchCtoF={props.onSwitchTempTypeCtoF}
                temperatureType={props.temperatureType}
            />
        </Aux>
    )
}

export default CurrentWeatherWrap
