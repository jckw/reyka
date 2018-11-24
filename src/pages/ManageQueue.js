import React from 'react'
import { Box, Text, Button, Flex } from 'rebass'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer, commitMutation, createRefetchContainer } from 'react-relay'
import environment from '../relay/environment'
import { Link } from '@reach/router'

import Card from '../components/Card'
import ButtonRow from '../components/ButtonRow'

import serve from '../assets/serve.svg'

class QueueLength extends React.Component {
    componentDidMount() {
        this.timeout = setInterval(this.refetch, 1000)
    }

    render() {
        const queue = this.props.que

        return (
            <Text fontWeight={700} color="greenGrey" textAlign="center" fontSize="72px">
                {queue.length}
            </Text>
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
                length(id: $id)
            }
        `
    },
    graphql`
        query ManageQueueLengthContainerRefetchQuery($id: ID!) {
            que(id: $id) {
                length(id: $id)
            }
        }
    `
)

class Queue extends React.Component {
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

    render() {
        const id = this.props.queueId

        return (
            <QueryRenderer
                environment={environment}
                query={graphql`
                    query ManageQueueQuery($id: ID!) {
                        que(id: $id) {
                            name
                            length(id: $id)
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
                        return <div>Loading...</div>
                    }

                    const queue = props.que

                    return (
                        <Flex css={{ maxWidth: 330 }} flexDirection="column" mx="auto">
                            <Card>
                                <Box
                                    bg="deepGreen"
                                    css={{ borderRadius: '38px 38px 0 0' }}
                                    py={3}
                                    px={4}
                                >
                                    <Text fontWeight={700}>{queue.name}</Text>
                                    <Text fontWeight={600}>Manager mode</Text>
                                </Box>
                                <Box py={5} px={4}>
                                    <QueueLengthContainer que={queue} />
                                    <Text textAlign="center">people in your queue</Text>
                                </Box>
                            </Card>
                            <ButtonRow>
                                <Button variant="green" onClick={this.serveSpot}>
                                    <img src={serve} alt="Show code" />
                                </Button>
                            </ButtonRow>
                        </Flex>
                    )
                }}
            />
        )
    }
}

export default Queue
