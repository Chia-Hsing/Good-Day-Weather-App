import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../HOC/Aux'
import Title from '../components/title'
import Input from '../components/input'
import * as actions from '../store/actions/forecast'
import { OpenWeatherAPIKey, googleGeoAPIKey } from '../APIKey.js'
import CurrentWeatherWrap from '../components/currentWeather/currentWeatherWrap'
import DailyWeatherWarp from '../components/dailyWeather/dailyWeatherWrap'
import HourlyWeatherWrap from '../components/hourlyWeather/hourlyWeatherWrap'

class Home extends Component {
    componentDidMount() {
        this.props.onCurrentLocationSearch(OpenWeatherAPIKey, googleGeoAPIKey)
    }

    onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            const location = e.target.value
            this.props.onCitySearch(location, OpenWeatherAPIKey, googleGeoAPIKey)
            this.props.onCurrentLocationHourlyWeatherSearch(
                OpenWeatherAPIKey,
                this.props.latLon.lat,
                this.props.latLon.lon
            )
        }
    }

    render() {
        let currentWeatherCondition = null
        if (this.props.currentWeather) {
            currentWeatherCondition = <CurrentWeatherWrap />
        }

        return (
            <Aux>
                <Title />
                <Input KeyDown={(e) => this.onKeyDownHandler(e)} />
                {currentWeatherCondition}
                <HourlyWeatherWrap
                    index={this.props.index}
                    hourlyWeather={this.props.hourlyWeather}
                    timezone={this.props.timezone}
                />
                <DailyWeatherWarp />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather,
        hourlyWeather: state.hourlyWeather,
        timezone: state.timezone,
        index: state.index,
        latLon: state.latLon,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCitySearch: (location, OWAPIKey, GoogleAPIKey) =>
            dispatch(actions.citySearch(location, OWAPIKey, GoogleAPIKey)),
        onCurrentLocationSearch: (OWAPIKey, GoogleAPIKey) =>
            dispatch(actions.currentLocationSearch(OWAPIKey, GoogleAPIKey)),
        onCurrentLocationHourlyWeatherSearch: (OWAPIKey, latitude, longitude) =>
            dispatch(actions.currentLocationHourlyWeatherSearch(OWAPIKey, latitude, longitude)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
