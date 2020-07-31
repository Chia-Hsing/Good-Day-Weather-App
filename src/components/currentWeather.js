import React, { Component } from 'react'

import classes from '../style/css/currentWeather.module.css'
import Aux from '../HOC/Aux'
import timeFormat from '../shared/timeConverter'
import { kTOc, kTOF } from '../shared/tempConverter'
import img from '../assets/animated/rainy-7.svg'

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
                    <section>
                        <div className={classes.city}>{city}</div>
                        <div className={classes.time}>{timeFormat(currentTime, timezone, 'MMMM Do YYYY h:mm a')}</div>
                    </section>
                    <img src={img} alt="icon" />
                    <section>
                        <div className={classes.temp}>{temperature}&deg;</div>
                        <div className={classes.tempType}>
                            <span onClick={this.onFtoCHandler} className={CTemp.join(' ')}>
                                C
                            </span>{' '}
                            |{' '}
                            <span onClick={this.onCtoFHandler} className={FTemp.join(' ')}>
                                F
                            </span>
                        </div>
                        <div className={classes.description}>{weather}</div>
                    </section>
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
