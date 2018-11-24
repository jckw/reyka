import React from 'react'
import { navigate } from '@reach/router'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            word1: '',
            word2: '',
            word3: ''
        }
    }

    _onSubmit = event => {
        console.log(this.state)
        // find out which queue these words match with
        // get the slug of that queue (probably just the id)
        // navigate to that queue page, thereby joining the queue
        navigate('/queue/')
        event.preventDefault()
    }

    updateWordInput = wordNum => event => {
        this.setState({
            [wordNum]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this._onSubmit}>
                <input
                    type="text"
                    value={this.state.word1}
                    onChange={this.updateWordInput('word1')}
                />
                <input
                    type="text"
                    value={this.state.word2}
                    onChange={this.updateWordInput('word2')}
                />
                <input
                    type="text"
                    value={this.state.word3}
                    onChange={this.updateWordInput('word3')}
                />
                <input type="submit" value="Join the queue" />
            </form>
        )
    }
}

export default Home