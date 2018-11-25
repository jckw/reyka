import React from 'react'
import { navigate } from '@reach/router'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }

    _onSubmit = event => {
        console.log(this.state)
        // find out which queue these words match with
        // get the slug of that queue (probably just the id)
        // navigate to that queue page, thereby joining the queue
        navigate(`/queue/${this.state.id}`)
        event.preventDefault()
    }

    updateID = event => {
        this.setState({
            id: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <form
                    onSubmit={this._onSubmit}
                    style={{
                        maxWidth: 500,
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <input
                        type="text"
                        value={this.state.word1}
                        onChange={this.updateID}
                        style={{
                            background: 'white',
                            color: '#4E4E4E',
                            border: 0,
                            borderRadius: '21px',
                            boxShadow: '0 2px 20px -8px rgba(188,188,188,0.50)',
                            outline: 'none',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            padding: '18px 32px',
                            display: 'block',
                            marginBottom: '18px'
                        }}
                    />
                    <input
                        type="submit"
                        value="Join the queue"
                        style={{
                            background: '#3A7046',
                            color: 'white',
                            border: 0,
                            borderRadius: '21px',
                            boxShadow: '0 2px 20px -8px rgba(188,188,188,0.50)',
                            outline: 'none',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            padding: '18px 32px',
                            display: 'block'
                        }}
                    />
                </form>
            </React.Fragment>
        )
    }
}

export default Home
