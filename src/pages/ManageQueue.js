import React from 'react'
import { Box, Text, Button, Flex } from 'rebass'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer, commitMutation, createRefetchContainer } from 'react-relay'
import environment from '../relay/environment'
import { Link, navigate } from '@reach/router'
import Spinner from 'react-spinkit'

import Card from '../components/Card'
import ButtonRow from '../components/ButtonRow'
import CardHeader from '../components/CardHeader'

import serve from '../assets/serve.svg'
import cog from '../assets/cog.svg'
import cross from '../assets/cross.svg'

class QueueLength extends React.Component {
    componentDidMount() {
        this.timeout = setInterval(this.refetch, 1000)
    }

    render() {
        const queue = this.props.que

        return (
            <Box py={5} px={4}>
                <Text fontWeight={700} color="greenGrey" textAlign="center" fontSize="72px">
                    {queue.length}
                </Text>
                <Text textAlign="center">
                    {queue.length === 1 ? 'person' : 'people'} in your queue
                </Text>
                <Text textAlign="center" mt={2}>
                    {queue.next
                        ? `Your next customer is #${queue.next.id}`
                        : 'No further customers'}
                </Text>
            </Box>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    refetch = () => {
        console.log('doing it')
        this.props.relay.refetch({ queId: this.props.que.id })
    }
}

const QueueLengthContainer = createRefetchContainer(
    QueueLength,
    {
        que: graphql`
            fragment ManageQueue_que on Que {
                id
                length
                next {
                    id
                }
            }
        `
    },
    graphql`
        query ManageQueueLengthContainerRefetchQuery($id: ID!) {
            que(id: $id) {
                length
                next {
                    id
                }
            }
        }
    `
)

class Settings extends React.Component {
    closeQueue = () => {
        console.log('closing the queue')
        // do the mutation

        navigate('/')
    }

    render() {
        return (
            <Box
                css={{
                    height: '100vh',
                    width: '100vw',
                    background: 'rgba(255, 255, 255, 0.8)',
                    position: 'fixed',
                    top: 0,
                    left: 0
                }}
                p={4}
            >
                <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    css={{ height: '100%' }}
                >
                    <div style={{ textAlign: 'right' }}>
                        <img src={cross} alt="close" onClick={this.props.toggleModal} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={this.closeQueue}>Close queue</Button>
                    </div>
                </Flex>
            </Box>
        )
    }
}

class Queue extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSettings: false
        }
    }

    serveSpot = () => {
        commitMutation(environment, {
            mutation: graphql`
                mutation ManageQueueMutation($queId: ID!) {
                    serveSpot(queId: $queId) {
                        id
                    }
                }
            `,
            variables: {
                queId: this.props.queueId
            },
            onCompleted: (response, error) => {
                if (!error) {
                    console.log('done it')
                }
            }
        })
    }

    toggleSettings = () => {
        console.log('toggling settings')
        this.setState({ showSettings: !this.state.showSettings })
    }

    render() {
        const id = this.props.queueId

        return (
            <React.Fragment>
                <Flex css={{ maxWidth: 330 }} flexDirection="column" mx="auto">
                    <QueryRenderer
                        environment={environment}
                        query={graphql`
                            query ManageQueueQuery($id: ID!) {
                                que(id: $id) {
                                    name
                                    length
                                    ...ManageQueue_que
                                }
                            }
                        `}
                        variables={{
                            id
                        }}
                        render={({ props, error }) => {
                            if (error) {
                                return (
                                    <Flex direction="column">
                                        Did you want to <Link to="/create">create a queue</Link>?
                                    </Flex>
                                )
                            }

                            if (!props) {
                                return <Spinner name="wordpress" color="white" />
                            }

                            const queue = props.que

                            return (
                                <React.Fragment>
                                    <div style={{ position: 'relative' }}>
                                        <Card>
                                            <CardHeader>
                                                <Text fontWeight={700}>{queue.name}</Text>
                                                <Text fontWeight={600}>Manager mode</Text>
                                            </CardHeader>
                                            <QueueLengthContainer que={queue} />
                                            <Box
                                                css={{
                                                    position: 'absolute',
                                                    bottom: 46,
                                                    right: 32
                                                }}
                                            >
                                                <img
                                                    src={cog}
                                                    alt="settings"
                                                    onClick={this.toggleSettings}
                                                />
                                            </Box>
                                        </Card>
                                        <ButtonRow>
                                            <Button variant="green" onClick={this.serveSpot}>
                                                <img src={serve} alt="Show code" />
                                            </Button>
                                        </ButtonRow>
                                    </div>
                                </React.Fragment>
                            )
                        }}
                    />
                </Flex>
                {this.state.showSettings && <Settings toggleModal={this.toggleSettings} />}
            </React.Fragment>
        )
    }
}

export default Queue
