import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../HOC/Aux'
import Title from '../components/title'
import Input from '../components/input'
import * as actions from '../store/actions/forecast'
import { OpenWeatherAPIKey, googleGeoAPIKey } from '../APIKey.js'
import CurrentWeatherWrap from '../components/currentWeather/currentWeatherWrap'
import DailyWeatherWrap from '../components/dailyWeather/dailyWeatherWrap'
import HourlyWeatherWrap from '../components/hourlyWeather/hourlyWeatherWrap'

class Home extends Component {
    componentDidMount() {
        this.props.onCurrentLocationSearch(OpenWeatherAPIKey, googleGeoAPIKey)
    }

    onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            const location = e.target.value
            this.props.onCitySearch(location, OpenWeatherAPIKey, googleGeoAPIKey)
        }
    }

    render() {
        let weatherForecast = null
        if (this.props.currentWeather) {
            weatherForecast = (
                <Aux>
                    <CurrentWeatherWrap
                        currentWeather={this.props.currentWeather}
                        timezone={this.props.timezone}
                        position={this.props.position}
                        temperatureType={this.props.temperatureType}
                        onSwitchTempTypeFtoC={this.props.onSwitchTempTypeFtoC}
                        onSwitchTempTypeCtoF={this.props.onSwitchTempTypeCtoF}
                        hourlyWeather={this.props.hourlyWeather}
                        onSetTodayEndIndex={this.props.onSetTodayEndIndex}
                    />
                    <HourlyWeatherWrap
                        index={this.props.index}
                        hourlyWeather={this.props.hourlyWeather}
                        timezone={this.props.timezone}
                        temperatureType={this.props.temperatureType}
                    />
                    <DailyWeatherWrap
                        onGetIndex={this.props.onGetIndex}
                        timezone={this.props.timezone}
                        dailyWeather={this.props.dailyWeather}
                        temperatureType={this.props.temperatureType}
                        index={this.props.index}
                    />
                </Aux>
            )
        }

        return (
            <Aux>
                <Title />
                <Input KeyDown={(e) => this.onKeyDownHandler(e)} />
                {weatherForecast}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather,
        dailyWeather: state.dailyWeather,
        hourlyWeather: state.hourlyWeather,
        timezone: state.timezone,
        index: state.index,
        latLon: state.latLon,
        position: state.position,
        temperatureType: state.temperatureType,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCitySearch: (location, OWAPIKey, GoogleAPIKey) =>
            dispatch(actions.citySearch(location, OWAPIKey, GoogleAPIKey)),
        onCurrentLocationSearch: (OWAPIKey, GoogleAPIKey) =>
            dispatch(actions.currentLocationSearch(OWAPIKey, GoogleAPIKey)),
        onSwitchTempTypeFtoC: () => dispatch(actions.switchTempTypeFtoC()),
        onSwitchTempTypeCtoF: () => dispatch(actions.switchTempTypeCtoF()),
        onGetIndex: (start, end) => dispatch(actions.getIndex(start, end)),
        onSetTodayEndIndex: (todayEnd) => dispatch(actions.setTodayEndIndex(todayEnd)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
