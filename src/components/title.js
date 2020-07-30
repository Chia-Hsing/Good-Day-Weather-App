import React from 'react'
import classes from '../style/css/title.module.css'

const title = (props) => {
    return (
        <div className={classes.Title}>
            <h1
                style={{
                    color: 'white',
                    fontSize: '4em',
                    fontFamily: 'Rajdhani',
                }}
            >
                GOOD DAY <span style={{ color: 'rgb(253, 108, 15)' }}>WEATHER</span> APP
            </h1>
        </div>
    )
}

export default title
