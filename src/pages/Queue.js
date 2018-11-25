import React from 'react'
import { Box, Text, Button, Flex } from 'rebass'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import { commitMutation } from 'react-relay'
import environment from '../relay/environment'
import { Link } from '@reach/router'
import Spinner from 'react-spinkit'

import Card from '../components/Card'
import ButtonRow from '../components/ButtonRow'
import CardHeader from '../components/CardHeader'

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
                    }
                }
            `,
            variables: {
                queId
            },
            onCompleted: (response, error) => {
                if (!error) {
                    this.setState({
                        spotId: response.createSpot.id
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
            <Flex css={{ maxWidth: 330 }} flexDirection="column" mx="auto">
                <QueryRenderer
                    environment={environment}
                    query={graphql`
                        query QueueQuery($id: ID!) {
                            que(id: $id) {
                                name
                                length
                            }
                        }
                    `}
                    variables={{
                        id
                    }}
                    render={({ props, error }) => {
                        if (error) {
                            return (
                                <div>
                                    <Text textAlign="center">
                                        We couldn't find a queue with ID #{id}.
                                    </Text>
                                    <Text textAlign="center">
                                        Did you want to <Link to="/create">create a queue</Link>?
                                    </Text>
                                </div>
                            )
                        }

                        if (!props) {
                            return <Spinner name="wordpress" color="white" />
                        }

                        const queue = props.que
                        const isAtFront = this.state.position && this.state.position <= 1

                        return (
                            <React.Fragment>
                                <Card>
                                    <CardHeader>
                                        <Text fontWeight={700}>{queue.name}</Text>
                                        <Text fontWeight={600}>
                                            {this.state.spotId
                                                ? `#${this.state.spotId}`
                                                : 'Joining the queue...'}
                                        </Text>
                                    </CardHeader>
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
                            </React.Fragment>
                        )
                    }}
                />
            </Flex>
        )
    }
}

export default Queue
