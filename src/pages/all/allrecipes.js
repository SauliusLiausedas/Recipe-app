import React, { Component } from 'react'
import recipeDB from '../../data.js'
import '../../stylesheets/allrecipes.css'

class AllRecipes extends Component {
    constructor(props) {
        super()
        this.methodText = React.createRef()
        this.recipeNames = []
        this.recipeIngredients = {}
        this.recipeMethod = []
        this.recipeImg = []
        this.state = {
            recipes: recipeDB,
            popup: "popup invisible"
        }
    }

    showAllRecipes() {
        for (let i=0; i<this.state.recipes.meal.length; i++) {
            this.recipeIngredients[this.state.recipes.meal[i].name] = []
            this.recipeNames.push(this.state.recipes.meal[i].name)
            this.recipeMethod.push(this.state.recipes.meal[i].method)
            this.recipeImg.push(this.state.recipes.meal[i].image)
            for (let j = 0; j < this.state.recipes.meal[i].ingredients.length; j++) {
                this.recipeIngredients[this.state.recipes.meal[i].name].push(this.state.recipes.meal[i].ingredients[j])
            }
        }
    }

    viewRecipe(e) {
        
    }

    render() {
        return (
            <div className="allRecipes">
                {this.showAllRecipes()}
                <div className={this.state.popup} onLoad={(e) => this.hide(e)}>
                </div>
                <div className="boxes">
                    {this.recipeNames.map((name, i) =>
                        <div key={i} id={name} className="recipe-box" onClick={(e)=>this.viewRecipe(e)}>
                            <img className="recipe-img" alt={name} src={this.recipeImg[i]}/>
                            <h2 key={i}>{name}</h2>
                            <em><p ref={this.methodText}>{this.recipeMethod[i].slice(0, 250) + "..."}</p></em>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default AllRecipes