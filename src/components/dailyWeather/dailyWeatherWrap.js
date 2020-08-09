import React from 'react'

import DailyWeather from './dailyWeather'
import { kTOC, kTOF } from '../../shared/tempConverter'
import timeFormat from '../../shared/timeConverter'
import classes from '../../style/css/dailyWeatherWrap.module.css'

const DailyWeatherWrap = (props) => {
    // render the first five days normally.
    let dayStart = 0
    let dayEnd = 5

    let timezone = props.timezone
    let currentTime = null

    // After 2300, the first component of daily weather should be presented to tomorrow's information.
    if (timezone) {
        const currentTimeStamp = new Date().getTime() / 1000
        currentTime = timeFormat(currentTimeStamp, timezone, 'HH')
        if (currentTime >= 23) {
            dayStart = 1
            dayEnd = 6
        }
    }

    let dailyWeather = props.dailyWeather.slice(dayStart, dayEnd).map((item, i) => {
        const sunriseTime = timeFormat(item.sunrise, timezone, 'HH:mm')
        const sunsetTime = timeFormat(item.sunset, timezone, 'HH:mm')
        const time = timeFormat(item.dt, timezone, 'MM/DD ddd')
        const weatherIcon = item.weather[0].icon
        const weatherDescription = item.weather[0].description

        let maxTemperature,
            minTemperature = ''

        if (props.temperatureType) {
            maxTemperature = kTOC(item.temp.max)
            minTemperature = kTOC(item.temp.min)
        } else {
            maxTemperature = kTOF(item.temp.max)
            minTemperature = kTOF(item.temp.min)
        }

        const onClickTargetHandler = () => {
            const countPerDay = 8

            let tomorrowStart = props.index.todayEnd
            let dailyWeatherStart = (i - 1) * countPerDay + tomorrowStart
            if (dailyWeatherStart <= 0) {
                dailyWeatherStart = 0
            }
            let dailyWeatherEnd = dailyWeatherStart + countPerDay
            props.onGetIndex(dailyWeatherStart, dailyWeatherEnd)
        }

        return (
            <DailyWeather
                key={item.dt}
                time={time}
                weatherIcon={weatherIcon}
                weatherDescription={weatherDescription}
                maxTemp={maxTemperature}
                minTemp={minTemperature}
                sunriseTime={sunriseTime}
                sunsetTime={sunsetTime}
                clickTarget={(e) => onClickTargetHandler(e)}
            />
        )
    })

    return <div className={classes.DailyWeatherWrap}>{dailyWeather}</div>
}

export default DailyWeatherWrap
