import React from 'react'

import classes from '../style/css/errorInfo.module.css'

const errorInfo = () => {
    return (
        <div className={classes.ErrorInfo}>
            <section>
                <span className="iconify" data-icon="icomoon-free:sad" data-inline="false"></span>
                <p>Sorry! this location could not be found. Please try again...</p>
            </section>
        </div>
    )
}

export default errorInfo
