import React, { Component } from 'react'
import recipeDB from '../../data.js'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'

class AllRecipes extends Component {
    constructor(props) {
        super()
        this.recipeNames = []
        this.recipeIngredients = {}
        this.recipeMethod = []
        this.recipeImg = []
        this.state = {
            recipes: recipeDB,
            recipeToShow: ""
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
        this.setState({recipeToShow: e.currentTarget.id})
    }

    render() {
        return (
            <div className="allRecipes">
                {this.showAllRecipes()}
                <ViewRecipe showRecipe={() => {this.recipeToRender()}} view={this.state.recipeToShow}/>
                <div className="boxes">
                    {this.recipeNames.map((name, i) =>
                        <div key={i} id={i} className="recipe-box" onClick={(e)=>this.viewRecipe(e)}>
                            <img className="recipe-img" alt={name} src={this.recipeImg[i]}/>
                            <h2 key={i}>{name}</h2>
                            <em><p>{this.recipeMethod[i].slice(0, 250) + "..."}</p></em>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default AllRecipes