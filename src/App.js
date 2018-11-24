import React, { Component } from 'react'
import { Router } from '@reach/router'
import { ThemeProvider } from 'styled-components'
import { Box } from 'rebass'

import theme from './theme'

import Home from './pages/Home'
import CreateQueue from './pages/CreateQueue'
import Queue from './pages/Queue'
import NotFound from './pages/NotFound'

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box className="App">
                    <Router>
                        <Home path="/" />
                        <CreateQueue path="/create" />
                        <Queue path="/queue/:queueSlug" />
                        <NotFound default />
                    </Router>
                </Box>
            </ThemeProvider>
        )
    }
}

export default App
