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

    // recipeToRender(recipeId) {
    //     this.setState({
    //         renderView: {
    //             id: recipeId,
    //             name: window.recipeDB.meal[recipeId].name,
    //             image: window.recipeDB.meal[recipeId].image,
    //             method: window.recipeDB.meal[recipeId].method,
    //             ingredients: window.recipeDB.meal[recipeId].ingredients
    //         }
    //     })
    // }

    // hideEdit() {
    //     this.setState({popup: "popup invisible"})
    // }

    editRecipe() {
        if (this.state.edit === false) {
            this.setState({edit: true})
        } else {
            this.setState({edit: false})
        }
    }

    editRecipeIngredients(e) {
        // console.log(e.target.id)
        window.recipeDB.meal[this.props.view.id-1].ingredients[e.target.id] = e.target.value
    }

    editRecipeElements(e) {
        if (e.target.id === 'name') {
            window.recipeDB.meal[this.props.view.id - 1].name = e.target.value
        } else if (e.target.id === 'method') {
            window.recipeDB.meal[this.props.view.id - 1].method = e.target.value
        }
    }

    render() {
        if (this.state.edit === false) {
            return (
                <div>
                    <div className={this.state.popup + this.props.popup}>
                        <h2>{this.props.view.name}</h2>
                        <ul className="ingredients-ul">
                            {this.props.view.ingredients.map((ingredient, i) => <li key={i}
                                                                                    className="ingredients-li">{ingredient} </li>)}
                        </ul>
                        <img alt={this.props.view.name} className="recipeImg" src={this.props.view.image}/>
                        <p className="method-text">{this.props.view.method}</p>
                        <div className="edit-btn-div">
                            <button className="edit-btn" onClick={() => this.editRecipe()}>Edit</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className={this.state.popup + this.props.popup}>
                        <input className="recipeName" id="name" defaultValue={this.props.view.name} onChange={(e)=> this.editRecipeElements(e)}/>
                        <ul className="ingredients-ul">
                            {this.props.view.ingredients.map((ingredient, i) => <li className="ingredients-li" key={i}><input id={i}
                                onChange={(e)=> this.editRecipeIngredients(e)} defaultValue={ingredient}/></li>)}
                        </ul>
                        <img alt={this.props.view.name} className="recipeImg" src={this.props.view.image}/>
                        <textarea className="method-textarea" id="method" defaultValue={this.props.view.method} onChange={(e)=> this.editRecipeElements(e)} />
                        <div className="edit-btn-div">
                            <button className="edit-btn" onClick={()=> this.editRecipe()}>{this.state.edit ? 'Save' : 'Edit'}</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ViewRecipe