import React, { Component } from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'
import CreateQueue from './pages/CreateQueue'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Home path="/" />
                    <CreateQueue path="/create" />
                </Router>
            </div>
        )
    }
}

export default App
