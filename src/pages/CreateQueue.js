import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import environment from '../relay/environment'
import { navigate } from '@reach/router'
import { Box, Text } from 'rebass'
import styled from 'styled-components'

import Card from '../components/Card'
import theme from '../theme'

const StyledInput = styled.input`
    background: transparent;
    border: 0;
    border-bottom: 2px dashed rgba(144, 125, 101, .51);
    outline: none;
    color: ${theme.colors.paleGreen};
    font-size: 22px;
    font-weight: bold;
`

class CreateQueue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    _onSubmit = event => {
        event.preventDefault()

        commitMutation(environment, {
            mutation: graphql`
                mutation CreateQueueMutation($name: String!) {
                    createQue(name: $name) {
                        id
                    }
                }
            `,
            variables: {
                name: this.state.name
            },
            onCompleted: (response, error) => {
                if (!error) {
                    navigate(`/queue/${response.createQue.id}`)
                }
            }
        })
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        })

        event.preventDefault()
    }

    render() {
        return (
            <React.Fragment>
                <Card bg="deepGreen" py={4} px={4}>
                    <Text fontWeight={700} fontSize="22px" mb={70}>Create a queue</Text>
                    <div>
                        <StyledInput type="text" value={this.state.name} onChange={this.handleChange} placeholder="Event name" />
                    </div>
                </Card>
                <div>
                    <button onClick={this._onSubmit}>Create</button>
                </div>
            </React.Fragment>
        )
    }
}

export default CreateQueue
