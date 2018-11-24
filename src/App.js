import React, { Component } from 'react'
import { Router } from '@reach/router'
import { ThemeProvider } from 'styled-components'
import { Flex } from 'rebass'

import theme from './theme'

import Home from './pages/Home'
import CreateQueue from './pages/CreateQueue'
import Queue from './pages/Queue'
import NotFound from './pages/NotFound'

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Flex className="App" flexDirection="column" justifyContent="center" css={{minHeight: '100vh'}}>
                    <Router>
                        <Home path="/" />
                        <CreateQueue path="/create" />
                        <Queue path="/queue/:queueSlug" />
                        <NotFound default />
                    </Router>
                </Flex>
            </ThemeProvider>
        )
    }
}

export default App
