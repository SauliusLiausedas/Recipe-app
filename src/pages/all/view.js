import React, { Component } from 'react'
import '../../stylesheets/view.css'


class ViewRecipe extends Component {
    constructor(props) {
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

    // editRecipeElements(e) {
    //     switch (e.target.id) {
    //
    //     }
    // }

    editRecipeIngredients(e) {

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
                        <input className="recipeName" defaultValue={this.props.view.name} />
                        <ul className="ingredients-ul">
                            {this.props.view.ingredients.map((ingredient, i) => <li className="ingredients-li" key={i}><input id={i}
                                onChange={(e)=> this.editRecipeIngredients(e)} defaultValue={ingredient}/></li>)}
                        </ul>
                        <img alt={this.props.view.name} className="recipeImg" src={this.props.view.image}/>
                        <textarea className="method-textarea" defaultValue={this.props.view.method} onChange={(e)=> this.editRecipeElements(e)} />
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