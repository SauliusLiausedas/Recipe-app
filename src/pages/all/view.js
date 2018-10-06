import React, { Component } from 'react'
import '../../stylesheets/view.css'


class ViewRecipe extends Component {
    constructor() {
        super()
        this.state = {
            edit: false,
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

    editRecipe() {
        if (this.state.edit === false) {
            this.setState({edit: true})
        } else {
            this.setState({edit: false})
        }
    }

    editRecipeIngredients(e) {
        window.recipeDB.meal[this.props.view.id].ingredients[e.target.id] = e.target.value
    }

    editRecipeElements(e) {
        if (e.target.id === 'name') {
            window.recipeDB.meal[this.props.view.id].name = e.target.value
        } else if (e.target.id === 'method') {
            window.recipeDB.meal[this.props.view.id].method = e.target.value
        }
    }

    deleteRecipe() {
        let confirmation = window.confirm("Are you sure?")
        if (confirmation) {
            window.recipeDB.meal.splice(this.props.view.id, 1)
            this.props.onClosePopup("")
            for (let i = 0; i < window.recipeDB.meal.length; i++) {
                if (window.recipeDB.meal[i].id !== i) {
                    window.recipeDB.meal[i].id = i
                }
            }
        } else {
            return false
        }
    }

    render() {
        if (this.state.edit === false) {
            return (
                <div>
                    <div className="popup">
                        <button className="exit btn" onClick={() => this.props.onClosePopup("")}> X </button>
                        <h2>{this.props.view.name}</h2>
                        <ul className="ingredients-ul">
                            {this.props.view.ingredients.map((ingredient, i) =><li key={i}
                                                                                        className="ingredients-li">{ingredient} </li>)}
                        </ul>
                        <img alt={this.props.view.name} className="recipeImg" src={this.props.view.image}/>
                        <p className="method-text">{this.props.view.method}</p>
                        <div className="edit-btn-div">
                            <button className="delete btn" onClick={()=> this.deleteRecipe()}>Delete</button>
                            <button className="edit btn" onClick={() => this.editRecipe()}>Edit</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="popup">
                        <input className="recipeName" id="name" defaultValue={this.props.view.name} onChange={(e)=> this.editRecipeElements(e)}/>
                        <ul className="ingredients-ul">
                            {this.props.view.ingredients.map((ingredient, i) => <li className="ingredients-li" key={i}><input className="ingredients-li-input" id={i}
                                onChange={(e)=> this.editRecipeIngredients(e)} defaultValue={ingredient}/></li>)}
                        </ul>
                        <img alt={this.props.view.name} className="recipeImg" src={this.props.view.image}/>
                        <textarea className="method-textarea" id="method" defaultValue={this.props.view.method} onChange={(e)=> this.editRecipeElements(e)} />
                        <div className="edit-btn-div">
                            <button className="edit btn" onClick={()=> this.editRecipe()}>{this.state.edit ? 'Save' : 'Edit'}</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ViewRecipe