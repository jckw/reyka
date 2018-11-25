import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import environment from '../relay/environment'
import { navigate } from '@reach/router'
import { Flex, Text, Button } from 'rebass'
import styled from 'styled-components'
import ButtonRow from '../components/ButtonRow'
import Spinner from 'react-spinkit'

import Card from '../components/Card'
import theme from '../theme'
import tick from '../assets/tick.svg'

const StyledInput = styled.input`
    background: transparent;
    border: 0;
    border-bottom: 2px dashed rgba(144, 125, 101, 0.51);
    outline: none;
    color: ${theme.colors.paleGreen};
    font-size: 22px;
    font-weight: bold;
`

class CreateQueue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            isLoading: false
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
                    console.log('loading!')
                    this.setState({
                        isLoading: true
                    })
                    navigate(`/admin/${response.createQue.id}`)
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
            <Flex css={{ maxWidth: 330 }} flexDirection="column" mx="auto">
                <Card bg="deepGreen" py={4} px={4}>
                    <Text fontWeight={700} fontSize="22px" mb={70}>
                        Create a queue
                    </Text>
                    <div>
                        <StyledInput
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Event name"
                        />
                    </div>
                </Card>
                <ButtonRow>
                    <Button variant="green" onClick={this._onSubmit}>
                        {this.state.isLoading ? <Spinner name="wordpress" color="white" /> : <img src={tick} alt="Create queue" />}
                    </Button>
                </ButtonRow>
            </Flex>
        )
    }
}

export default CreateQueue
