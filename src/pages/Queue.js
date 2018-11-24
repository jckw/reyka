import React from 'react'
import { Box, Text, Button, Flex } from 'rebass'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import { commitMutation } from 'react-relay'
import environment from '../relay/environment'
import { Link } from '@reach/router'

import Card from '../components/Card'
import ButtonRow from '../components/ButtonRow'

import code from '../assets/code.svg'
import exit from '../assets/exit.svg'
import { navigate } from '@reach/router'

class Queue extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            spotId: undefined,
            position: undefined
        }

        this.joinQueue(props.queueId)
    }

    joinQueue = queId => {
        commitMutation(environment, {
            mutation: graphql`
                mutation QueueJoinMutation($queId: ID!) {
                    createSpot(queId: $queId) {
                        id
                        que {
                            length(id: $queId)
                        }
                    }
                }
            `,
            variables: {
                queId
            },
            onCompleted: (response, error) => {
                if (!error) {
                    this.setState({
                        spotId: response.createSpot.id,
                        position: response.createSpot.que.length
                    })
                }
            }
        })
    }

    leaveQueue = () => {
        commitMutation(environment, {
            mutation: graphql`
                mutation QueueLeaveMutation($spotId: ID!) {
                    leaveSpot(spotId: $spotId) {
                        id
                    }
                }
            `,
            variables: {
                spotId: this.state.spotId
            },
            onCompleted: (response, error) => {
                if (!error) {
                    navigate('/')
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
                    query QueueQuery($id: ID!) {
                        que(id: $id) {
                            name
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
                    const isAtFront = this.state.position && this.state.position <= 1

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
                                    <Text fontWeight={600}>
                                        {this.state.spotId
                                            ? `#${this.state.spotId}`
                                            : 'Joining the queue...'}
                                    </Text>
                                </Box>
                                <Box py={5} px={4}>
                                    <Text
                                        fontWeight={700}
                                        color="greenGrey"
                                        textAlign="center"
                                        fontSize="72px"
                                    >
                                        {isAtFront
                                            ? `#${this.state.spotId}`
                                            : this.state.position
                                            ? this.state.position - 1
                                            : '...'}
                                    </Text>
                                    <Text textAlign="center">
                                        {isAtFront
                                            ? 'Bring this code to the front'
                                            : 'people in front of you'}
                                    </Text>
                                </Box>
                            </Card>
                            <ButtonRow>
                                <Button variant="red" onClick={this.leaveQueue}>
                                    <img src={exit} alt="Exit" />
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
