import React, { Component } from 'react'
import { Router, navigate } from '@reach/router'

class CreateQueue extends React.Component {
	constructor(props){
        super(props);
        this.state={
            queue : ''
        }
    }

    _onSubmit= event=>{
        console.log(this.state);
        
        event.preventDefault();
    }

    handleChange= (event)=>{ 
        this.setState({
            queue: event.target.value
        });

    event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this._onSubmit}>
                 <div className="CreateQueue">  
                    <label>
                    	Create a queue: 
                        <br></br>
                    	<input type="text" value = {this.state.queue}  onChange={this.handleChange} />
                        <br></br>
                     </label>
                     <input type="submit" value="Create" />
                </div>
            </form>
        )
    }
}

export default CreateQueue