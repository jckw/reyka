import React from 'react'
import { Box, Text } from 'rebass'

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
        const queue = {
            name: 'Burgers at Ball',
            id: 341419
        }
        const position = 5

        return (
            <React.Fragment>
                <Card>
                    <Box bg="deepGreen" css={{ borderRadius: '38px 38px 0 0' }} py={3} px={4}>
                        <Text fontWeight={700}>{queue.name}</Text>
                        <Text fontWeight={600}>Customer #{id}</Text>
                    </Box>
                    <Box py={5} px={4}>
                        <Text fontWeight={700} color="greenGrey" textAlign="center" fontSize="72px">
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
    }
}

export default Queue
