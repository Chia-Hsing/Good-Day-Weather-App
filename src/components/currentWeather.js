import React, { Component } from 'react'

import classes from '../style/css/currentWeather.module.css'
import Aux from '../HOC/Aux'
import timeFormat from '../shared/timeConverter'
import { kTOc, kTOF } from '../shared/tempConverter'

// import moment from 'moment-timezone'

class currentWeather extends Component {
    state = {
        temperatureType: true,
    }

    onCtoFHandler = () => {
        this.setState({
            temperatureType: false,
        })
    }

    onFtoCHandler = () => {
        this.setState({
            temperatureType: true,
        })
    }

    render() {
        const { humidity, temp, wind_speed, uvi, feels_like, weather, sunrise, sunset } = this.props.currentWeather
        const timezone = this.props.timezone
        const city = this.props.cityShown

        //* Get the timestamp of current time.
        const currentTime = new Date().getTime() / 1000

        //* Swift temperature type and change the button color.
        let temperature,
            feelsLike = ''

        let CTemp = [classes.CTemp]
        let FTemp = [classes.FTemp]

        if (this.state.temperatureType) {
            temperature = kTOc(temp)
            feelsLike = kTOc(feels_like)
            CTemp.push(classes.selected)
        } else {
            temperature = kTOF(temp)
            feelsLike = kTOF(feels_like)
            FTemp.push(classes.selected)
        }
        //* ------------------------------

        const currentWeatherCondition = (
            <div className={classes.CurrentWeather}>
                <div className={classes.CurrentWeatherOverview}>
                    <div>{city}</div>
                    <div>{timeFormat(currentTime, timezone, 'MMMM Do YYYY h:mm a')}</div>
                    <div>{temperature}&deg;</div>
                    <div>
                        <span onClick={this.onFtoCHandler} className={CTemp.join(' ')}>
                            C
                        </span>{' '}
                        |{' '}
                        <span onClick={this.onCtoFHandler} className={FTemp.join(' ')}>
                            F
                        </span>
                    </div>
                    <div>{weather}</div>
                </div>
                <div className={classes.CurrentWeatherDetail}>
                    <div>
                        <span>sunrise</span>
                        <br />
                        <span>{timeFormat(sunrise, timezone, 'h:mm a')}</span>
                    </div>
                    <div>
                        <span>wind</span> <br />
                        <span> {wind_speed} kmph</span>
                    </div>
                    <div>
                        <span>humidity</span> <br />
                        <span>{humidity}%</span>
                    </div>
                    <div>
                        <span>sunset</span>
                        <br />
                        <span>{timeFormat(sunset, timezone, 'h:mm a')}</span>
                    </div>
                    <div>
                        <span>UV index</span> <br />
                        <span>{uvi}</span>
                    </div>
                    <div>
                        <span>feels like</span> <br />
                        <span>{feelsLike}&deg;</span>
                    </div>
                </div>
            </div>
        )

        return <Aux>{currentWeatherCondition}</Aux>
    }
}

export default currentWeather
