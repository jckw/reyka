import React from 'react'

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
            <div>
                <div>
                    <p>{queue.name}</p>
                    <p>Customer #{id}</p>
                </div>
                <div>
                    <p>{position}</p>
                    <p>customers in front of you</p>
                </div>
                <div>
                    <button onClick={this.leaveQueue}>Leave</button>
                    <button onClick={this.showCode}>Code</button>
                </div>
            </div>
        )
    }
}

export default Queue
