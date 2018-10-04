import React, { Component } from 'react'
import '../../stylesheets/edit.css'

class Edit extends Component {

    editRecipe(e) {
        console.log('trigered')
    }
    render() {
        return(
            <div className="edit-btn-div">
                <button className="edit-btn" onClick={(e)=> this.editRecipe(e)}>Edit</button>
            </div>
        )
    }
}

export default Edit