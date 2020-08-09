import React from 'react'

import classes from '../../style/css/hourlyWeather.module.css'

const hourlyWeather = (props) => {
    return (
        <div className={classes.HourlyWeather}>
            <div>{props.time}</div>
            <img src={`http://openweathermap.org/img/wn/${props.weatherIcon}@4x.png`} alt="" />
            <p className={classes.WeatherDescription}>{props.weatherDescription}</p>
            <section>
                <div>
                    <span className="iconify" data-icon="ic:round-cloud-queue" data-inline="false"></span>
                    <span> {props.cloud} %</span>
                </div>
                <div>
                    <span className="iconify" data-icon="carbon:temperature" data-inline="false"></span>
                    <span> {props.temp}&deg;</span>
                </div>
            </section>
        </div>
    )
}

export default hourlyWeather
