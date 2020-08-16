import React from 'react'

import classes from '../style/css/input.module.css'

const input = (props) => {
    let inputClass = [classes.Input]
    if (props.currentWeather) {
        inputClass.push(classes.changed)
    }
    return (
        <div>
            <input
                onKeyDown={props.KeyDown}
                className={inputClass.join(' ')}
                type="text"
                placeholder="city weather forecast"
                onChange={props.changed}
            />
        </div>
    )
}

export default input
