import React from 'react'
import classes from '../style/css/input.module.css'

const input = (props) => {
    return (
        <div>
            <input
                onKeyDown={props.KeyDown}
                className={classes.Input}
                type="text"
                placeholder="city weather forecast"
            />
        </div>
    )
}

export default input
