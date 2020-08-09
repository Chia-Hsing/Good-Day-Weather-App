import React from 'react'

// import Aux from '../HOC/Aux'
import { kTOC, kTOF } from '../../shared/tempConverter'
import timeFormat from '../../shared/timeConverter'
import classes from '../../style/css/hourlyWeatherWrap.module.css'
import HourlyWeather from './hourlyWeather'

const hourlyWeatherWrap = (props) => {
    //* decide what kind of temperature type should be rendered.
    const tempTypeHandler = (item) => {
        let temperature = ''

        if (props.temperatureType) {
            temperature = kTOC(item.main.temp)
        } else {
            temperature = kTOF(item.main.temp)
        }

        return temperature
    }
    //* ========================================================

    //* decide which index of hourly weather should be rendered.
    let hourlyWeather = null

    // first rendering or when index.start <=0
    let hourlyWeatherStart = 0
    let hourlyWeatherEnd = props.index.todayEnd
    if (props.index.start && props.index.end) {
        // if index.start <=0, render the component above.
        hourlyWeatherStart = props.index.start
        hourlyWeatherEnd = props.index.end
    }
    //* ========================================================

    if (props.hourlyWeather) {
        hourlyWeather = props.hourlyWeather.slice(hourlyWeatherStart, hourlyWeatherEnd).map((item) => {
            const {
                dt,
                weather: [{ description, icon }],
                clouds: { all },
            } = item
            const time = timeFormat(dt, props.timezone, 'HH:mm')

            const temperature = tempTypeHandler(item)

            return (
                <HourlyWeather
                    key={item.dt}
                    time={time}
                    weatherDescription={description}
                    weatherIcon={icon}
                    temp={temperature}
                    cloud={all}
                />
            )
        })
    }

    return <div className={classes.HourlyWeatherWrap}>{hourlyWeather}</div>
}

export default hourlyWeatherWrap
