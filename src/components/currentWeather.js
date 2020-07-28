import React, { Component } from 'react'

import classes from '../style/css/currentWeather.module.css'
import Aux from '../HOC/Aux'
import timeFormat from '../shared/timeConverter'

// import moment from 'moment-timezone'

class currentWeather extends Component {
    render() {
        const { humidity, temp, wind_speed, uvi, feels_like, weather } = this.props.currentWeather
        const sunrise = this.props.currentWeather.sunrise
        const sunset = this.props.currentWeather.sunset

        const currentWeatherCondition = (
            <div className={classes.CurrentWeather}>
                <div className={classes.CurrentWeatherOverview}>
                    <div>{temp} &deg;</div>
                    <div>{weather}</div>
                </div>
                <div className={classes.CurrentWeatherDetail}>
                    <div>
                        <span>sunrise</span>
                        <br />
                        <span>{timeFormat(sunrise, 'Asia/Taipei', 'h:mm a')}</span>
                    </div>
                    <div>
                        <span>sunset</span>
                        <br />
                        <span>{timeFormat(sunset, 'Asia/Taipei', 'h:mm a')}</span>
                    </div>
                    <div>
                        <span>humidity</span> <br />
                        <span>{humidity}%</span>
                    </div>
                    <div>
                        <span>speed</span> <br />
                        <span> {wind_speed} kmph</span>
                    </div>
                    <div>
                        <span>uvi</span> <br />
                        <span>{uvi}</span>
                    </div>
                    <div>
                        <span>feels like</span> <br />
                        <span>{feels_like} &deg;</span>
                    </div>
                </div>
            </div>
        )

        return <Aux>{currentWeatherCondition}</Aux>
    }
}

export default currentWeather
