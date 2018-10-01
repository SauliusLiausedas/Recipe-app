import React, { Component } from 'react'
import '../../stylesheets/view.css'
import recipeDB from '../../data.js'

class ViewRecipe extends Component {
    constructor(props) {
        super()
        this.state = {
            popup: "popup",
            renderView: {
                id: "",
                name: "",
                image: "",
                method: "",
                ingredients: []
            },

        }
    }

    componentDidUpdate() {
        if (this.props.view) {
            this.recipeToRender(this.props.view)
        }
    }

    recipeToRender(recipeId) {
        console.log(recipeId)
        this.setState({renderView: {
            id: recipeId,
            name: recipeDB.meal[recipeId].name,
            image: recipeDB.meal[recipeId].image,
            method: recipeDB.meal[recipeId].method,
            ingredients: recipeDB.meal[recipeId].ingredients
        }})
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
                    {/*<div onDoubleClick={() => this.recipeToRender(this.props.view)}>*/}
                    <div className={this.state.popup}>
                        {this.state.renderView.ingredients}
                        <img src={this.state.renderView.image}/>
                        {this.state.renderView.method}
                        {this.state.renderView.name}
                    </div>
                </div>
            )
        }
    }
}

export default ViewRecipe