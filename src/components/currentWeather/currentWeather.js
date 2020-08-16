import React from 'react'

import classes from '../../style/css/currentWeather.module.css'

const currentWeather = (props) => {
    let CTemp = [classes.CTemp]
    let FTemp = [classes.FTemp]

    if (props.temperatureType) {
        CTemp.push(classes.selected)
    } else {
        FTemp.push(classes.selected)
    }

    const currentWeatherCondition = (
        <div className={classes.CurrentWeather}>
            <div className={classes.CurrentWeatherOverview}>
                <section>
                    <div className={classes.city}>{props.cityShown}</div>
                    <div className={classes.time}>{props.timeShown}</div>
                </section>
                <img src={`https://openweathermap.org/img/wn/${props.weatherIcon}@4x.png`} alt="icon" />
                <section>
                    <div className={classes.temp}>{props.temp}&deg;</div>
                    <div className={classes.tempType}>
                        <span onClick={props.switchFtoC} className={CTemp.join(' ')}>
                            C
                        </span>{' '}
                        |{' '}
                        <span onClick={props.switchCtoF} className={FTemp.join(' ')}>
                            F
                        </span>
                    </div>
                    <div className={classes.description}>{props.weatherDescription}</div>
                </section>
            </div>

            <div className={classes.CurrentWeatherDetail}>
                <div>
                    <span>sunrise</span>
                    <br />
                    <span>{props.sunriseTime}</span>
                </div>
                <div>
                    <span>wind</span> <br />
                    <span>{props.wind_speed} kmph</span>
                </div>
                <div>
                    <span>humidity</span> <br />
                    <span>{props.humidity}%</span>
                </div>
                <div>
                    <span>sunset</span>
                    <br />
                    <span>{props.sunsetTime}</span>
                </div>
                <div>
                    <span>UV index</span> <br />
                    <span>{props.uvi}</span>
                </div>
                <div>
                    <span>feels like</span> <br />
                    <span>{props.feelsLike}&deg;</span>
                </div>
            </div>
        </div>
    )

    return currentWeatherCondition
}

export default currentWeather
