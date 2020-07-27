import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../HOC/Aux'
import Title from '../components/title'
import Input from '../components/input'
import Layout from '../components/layout'
import * as actions from '../store/actions/forecast'
import { OpenWeatherAPIKey, googleGeoAPIKey } from '../APIKey.js'

class Home extends Component {
    componentDidMount() {
        this.props.onSearchCurrentLocation(OpenWeatherAPIKey, googleGeoAPIKey)
    }

    onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            const location = e.target.value
            this.props.onSearchCity(location, OpenWeatherAPIKey, googleGeoAPIKey)
        }
    }

    render() {
        return (
            <Aux>
                <Title />
                <Input KeyDown={(e) => this.onKeyDownHandler(e)} />
                {/* <weather /> */}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather,
        dailyWeather: state.dailyWeather,
        latAndLon: state.latAndLon,
        showForecast: state.showForecast,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchCity: (location, OWAPIKey, GoogleAPIKey) =>
            dispatch(actions.searchCity(location, OWAPIKey, GoogleAPIKey)),
        onSearchCurrentLocation: (OWAPIKey, GoogleAPIKey) =>
            dispatch(actions.searchCurrentLocation(OWAPIKey, GoogleAPIKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
