import React, { Component } from 'react'
import { Router } from '@reach/router'
import { ThemeProvider } from 'styled-components'
import { Flex } from 'rebass'
import Header from './components/Header'

import theme from './theme'

import Home from './pages/Home'
import CreateQueue from './pages/CreateQueue'
import Queue from './pages/Queue'
import NotFound from './pages/NotFound'
import ManageQueue from './pages/ManageQueue'

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Header />
                    <Flex
                        className="App"
                        flexDirection="column"
                        justifyContent="center"
                        css={{ minHeight: '100vh' }}
                    >
                        <Router>
                            <Home path="/" />
                            <CreateQueue path="/create" />
                            <Queue path="/queue/:queueId" />
                            <ManageQueue path="/admin/:queueId" />
                            <NotFound default />
                        </Router>
                    </Flex>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}

export default App
