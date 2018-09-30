import React, { Component } from 'react'
import '../../stylesheets/view.css'

class ViewRecipe extends Component {
    constructor(props) {
        super()
        this.state = {
            view: "",
            popup: "popup"
        }
    }

    render() {
        if (this.props.view === "") {
            return(
            <div>

            </div>
            )
        } else {
            return (
                <div>
                    <div className={this.state.popup}>
                        {this.props.view}
                    </div>
                </div>
            )
        }
    }
}

export default ViewRecipe