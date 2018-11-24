import React, { Component } from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'
import CreateQueue from './pages/CreateQueue'
import Queue from './pages/Queue'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Home path="/" />
                    <CreateQueue path="/create" />
                    <Queue path="/queue/:queueSlug" />
                </Router>
            </div>
        )
    }
}

export default App
