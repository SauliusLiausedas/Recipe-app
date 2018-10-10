import React, { Component } from 'react'
import '../../stylesheets/view.css'
import {getAllRecipes, getRecipeById} from "../../services/getRecipesService";

class ViewRecipe extends Component {
    constructor() {
        super()
        this.state = {
            edit: false,
            ingredients: [""]
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
        const id= e.target.id;
        const value= e.target.value;

        // cant use getRecipeById because we need to save changes.
        // see more verbose notes in getRecipesService.js

        // getRecipeById(id).then(recipe => {
        //     recipe.ingredients[id] = value;
        // });

        getAllRecipes().then(recipes => {
            recipes[this.props.view.id].ingredients[id] = value;
        });

        // window.recipeDB.meal[this.props.view.id].ingredients[e.target.id] = e.target.value
    }


    editRecipeElements(e) {
        const id= e.target.id;
        const value= e.target.value;

        //can't use getRecipeById here either

        // getRecipeById(id).then(recipe => {
        //     if (id === 'name') {
        //         recipe.name = value;
        //     } else if (id === 'method') {
        //         recipe.method = value;
        //     } else if (id === 'image') {
        //         recipe.image = value;
        //         console.log(this.props.view.image)
        //     }
        // });

        getAllRecipes().then(recipes =>{
            if (id === 'name') {
                        recipes.meal[this.props.view.id].name = value;
                    } else if (id === 'method') {
                        recipes.meal[this.props.view.id].method = value;
                    } else if (id === 'image') {
                        recipes.meal[this.props.view.id].image = value;
                        console.log(this.props.view.image)
                    }
        });

        // if (e.target.id === 'name') {s
        //     window.recipeDB.meal[this.props.view.id].name = e.target.value
        // } else if (e.target.id === 'method') {
        //     window.recipeDB.meal[this.props.view.id].method = e.target.value
        // } else if (e.target.id === 'image') {
        //     window.recipeDB.meal[this.props.view.id].image = e.target.value
        //     console.log(this.props.view.image)
        // }
    }

    createNewInput() {
        getAllRecipes().then(recipes => {

        });
        //can't use getRecipeById here either
        getAllRecipes().then(recipes => {
            recipes .meal[this.props.view.id].ingredients = recipes .meal[this.props.view.id].ingredients.concat([''])
            this.setState({ingredients: this.state.ingredients.concat([''])})
        });

        // window.recipeDB.meal[this.props.view.id].ingredients = window.recipeDB.meal[this.props.view.id].ingredients.concat([''])
        // this.setState({ingredients: this.state.ingredients.concat([''])})
    }

    deleteIngredient(e) {
        const id= e.target.id;
        //can't use getRecipeById here either
        getAllRecipes().then(recipes => {
            recipes.meal[this.props.view.id].ingredients.splice(id, 1)
            this.setState({ingredients: recipes.meal[this.props.view.id].ingredients})
        });

        //// let ingredient = window.recipeDB.meal[this.props.view.id].ingredients.splice(e.target.id, 1)
        // window.recipeDB.meal[this.props.view.id].ingredients.splice(e.target.id, 1)
        // this.setState({ingredients: window.recipeDB.meal[this.props.view.id].ingredients})
    }

    deleteRecipe() {
        let confirmation = window.confirm("Are you sure?")
        if (confirmation) {
            getAllRecipes().then(recipes => {
                recipes.meal.splice(this.props.view.id, 1)
                this.props.onClosePopup("")
                for (let i = 0; i < recipes.meal.length; i++) {
                    if (recipes.meal[i].id !== i) {
                        recipes.meal[i].id = i
                    }
                }
            });
            // window.recipeDB.meal.splice(this.props.view.id, 1)
            // this.props.onClosePopup("")
            // for (let i = 0; i < window.recipeDB.meal.length; i++) {
            //     if (window.recipeDB.meal[i].id !== i) {
            //         window.recipeDB.meal[i].id = i
            //     }
            // }
        } else {
            return false
        }
    }

    componentWillMount() {
        getRecipeById(this.props.view.id).then(recipe => {
            this.setState({ingredients: recipe.ingredients});
        });
        // this.setState({ingredients: window.recipeDB.meal[this.props.view.id].ingredients})
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
                        <ul id="listOfIngredientsInputs" className="ingredients-ul">
                            {this.props.view.ingredients.map((ingredient, i) => <li className="ingredients-li" key={i}><input className="ingredients-li-input" id={i}
                                onChange={(e)=> this.editRecipeIngredients(e)} placeholder={ingredient}/><button id={i} className="addRemButton" onClick={(e)=> this.deleteIngredient(e)}>-</button></li>)}
                            <p className="ingredients-li right"> Add new ingredient <button className="addRemButton" onClick={()=> this.createNewInput()}>+</button></p>
                        </ul>
                        <img alt={this.props.view.name} className="recipeImg" src={this.props.view.image}/>
                        <input className="ingredients-li-input url" onChange={(e)=> this.editRecipeElements(e)} id="image" placeholder="Add image URL" />
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