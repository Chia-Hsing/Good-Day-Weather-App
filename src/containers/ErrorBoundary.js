import React, { Component } from 'react'

import Aux from '../HOC/Aux'

class ErrorBoundary extends Component {
    state = { hasError: false, error: null }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, error: error })
        console.log(error, errorInfo)
    }

    render() {
        return <Aux>{this.state.hasError ? <p>something went wrong</p> : this.props.children}</Aux>
    }
}

export default ErrorBoundary
