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

    // componentDidMount(){
    //
    // }

    recipeToRender(recipeId) {
        this.setState({
            renderView: {
                id: recipeId,
                name: recipeDB.meal[recipeId].name,
                image: recipeDB.meal[recipeId].image,
                method: recipeDB.meal[recipeId].method,
                ingredients: recipeDB.meal[recipeId].ingredients
            }
        })
    }

    hideEdit() {
        this.setState({popup: "popup invisible"})
        console.log(this.state)
    }

    render() {
        if (this.props.view === "") {
            return(
            <div>

            </div>
            )
        } else {
            return (
                <div onClick={() => this.recipeToRender(this.props.view)}>
                    {/*{this.props.showRecipe(this.props.view)}*/}
                    <div className={this.state.popup}>
                        <h2>{this.state.renderView.name}</h2>
                        <ul className="ingredients-ul">
                            {this.state.renderView.ingredients.map((ingredient, i)=> <li key={i} className="ingredients-li">{ingredient} </li> )}
                        </ul>
                        <img className="recipeImg" src={this.state.renderView.image}/>
                        <p className="method-text">{this.state.renderView.method}</p>
                    </div>
                </div>
            )
        }
    }
}

export default ViewRecipe