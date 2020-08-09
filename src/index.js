import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'

import * as serviceWorker from './serviceWorker'
import App from './App'
import './style/css/index.css'
import reducer from './store/reducer/forecast'

const composeEnhancers =
    process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
