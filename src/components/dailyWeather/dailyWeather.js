import React from 'react'

import classes from '../../style/css/dailyWeather.module.css'

const dailyWeather = (props) => {
    return (
        <div className={classes.DailyWeather} onClick={props.clickTarget}>
            <div>{props.time}</div>
            <img src={`https://openweathermap.org/img/wn/${props.weatherIcon}@4x.png`} alt="icon" />
            <p>{props.weatherDescription}</p>
            <section>
                <div>{props.minTemp}&deg;</div>
                <div>{props.maxTemp}&deg;</div>
            </section>
            <section>
                <div>
                    <span className="iconify" data-icon="wi:sunrise" data-inline="false"></span> {props.sunriseTime}
                </div>
                <div>
                    <span className="iconify" data-icon="wi:sunset" data-inline="false"></span> {props.sunsetTime}
                </div>
            </section>
        </div>
    )
}

export default dailyWeather
