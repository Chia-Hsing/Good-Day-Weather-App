import React from 'react'
import classes from '../style/css/title.module.css'

const title = () => {
    return (
        <div className={classes.Title}>
            <h1 style={{ color: 'white', fontSize: '3em' }}>GOOD DAY WEATHER APP</h1>
        </div>
    )
}

export default title
