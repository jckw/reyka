import React from 'react'
import { Box, Text } from 'rebass'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import environment from '../relay/environment'

import Card from '../components/Card'

class Queue extends React.Component {
    leaveQueue = () => {
        console.log('I am leaving the queue!')
    }

    showCode = () => {
        console.log('I am showing the code!')
    }

    render() {
        const id = this.props.queueSlug

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
                        return <div>error!</div>
                    }

                    if (!props) {
                        return <div>Loading...</div>
                    }

                    const queue = props.que
                    const position = 4

                    return (
                        <React.Fragment>
                            <Card>
                                <Box
                                    bg="deepGreen"
                                    css={{ borderRadius: '38px 38px 0 0' }}
                                    py={3}
                                    px={4}
                                >
                                    <Text fontWeight={700}>{queue.name}</Text>
                                    <Text fontWeight={600}>Something here</Text>
                                </Box>
                                <Box py={5} px={4}>
                                    <Text
                                        fontWeight={700}
                                        color="greenGrey"
                                        textAlign="center"
                                        fontSize="72px"
                                    >
                                        {position}
                                    </Text>
                                    <Text textAlign="center">people in front of you</Text>
                                </Box>
                            </Card>
                            <div>
                                <button onClick={this.leaveQueue}>Leave</button>
                                <button onClick={this.showCode}>Code</button>
                            </div>
                        </React.Fragment>
                    )
                }}
            />
        )
    }
}

export default Queue
