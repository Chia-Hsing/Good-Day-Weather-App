import React from 'react'
import Aux from '../HOC/Aux'
import classes from '../style/css/layout.module.css'

const layout = (props) => {
    return (
        <Aux>
            <main className={classes.Layout}>{props.children}</main>
        </Aux>
    )
}

export default layout
