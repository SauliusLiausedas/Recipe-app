import React, { Component } from 'react'

class Items extends Component {
    render() {
        return(
            <h1>{this.props.items.name}</h1>
        )
    }
}

export default Items