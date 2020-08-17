import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Aux from '../HOC/Aux'
import Title from '../components/title'
import Input from '../components/input'
import * as actions from '../store/actions/forecast'
// import { OpenWeatherAPIKey, googleGeoAPIKey } from '../APIKey.js'
import CurrentWeatherWrap from '../components/currentWeather/currentWeatherWrap'
import DailyWeatherWrap from '../components/dailyWeather/dailyWeatherWrap'
import HourlyWeatherWrap from '../components/hourlyWeather/hourlyWeatherWrap'
import ErrorBoundary from './ErrorBoundary'
import ErrorInfo from '../components/errorInfo'
import classes from '../style/css/home.module.css'
import Spinner from '../components/spinner'

class Home extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.onCurrentLocationSearch(
                process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                process.env.REACT_APP_GOOGLE_GEO_API_KEY
            )
        }, 1000)
    }

    onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            const location = e.target.value
            this.props.onCitySearch(
                location,
                process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                process.env.REACT_APP_GOOGLE_GEO_API_KEY
            )
        }
    }

    render() {
        let weatherForecast = null
        let redirectToError = null

        redirectToError = this.props.error ? <Redirect to="/error" /> : null
        let router = <Route path="/error" component={ErrorInfo} />

        let homeClass = [classes.Home]
        if (this.props.currentWeather && this.props.error === null) {
            homeClass.push(classes.changed)

            weatherForecast = (
                <Aux>
                    <Redirect to="/" />
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
                <ErrorBoundary>
                    <Title />
                    {this.props.currentWeather ? null : <Spinner />}
                    <Input
                        KeyDown={(e) => this.onKeyDownHandler(e)}
                        currentWeather={this.props.currentWeather}
                        error={this.props.error}
                    />
                    {redirectToError}
                    {router}
                    <div className={homeClass.join(' ')}>{weatherForecast}</div>
                </ErrorBoundary>
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
        error: state.error,
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
