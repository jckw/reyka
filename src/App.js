import React, { Component } from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'
import CreateQueue from './pages/CreateQueue'
import Queue from './pages/Queue'
import NotFound from './pages/NotFound'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Home path="/" />
                    <CreateQueue path="/create" />
                    <Queue path="/queue/:queueSlug" />
                    <NotFound default />
                </Router>
            </div>
        )
    }
}

export default App
