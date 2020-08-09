import React from 'react'

import classes from '../style/css/spinner.module.css'
import Aux from '../HOC/Aux'

const spinner = () => {
    return (
        <Aux>
            <div className={classes.loader}></div>
            <p>Start fetching the weather forecast near your location...</p>
        </Aux>
    )
}

export default spinner
