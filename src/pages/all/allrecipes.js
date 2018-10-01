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

    viewRecipe(e) {
        this.setState({recipeToShow: e.currentTarget.id})
    }

    render() {
        return (
            <div className="allRecipes">
                {this.state.recipeToShow ? (<ViewRecipe view={this.state.recipes.meal[this.state.recipeToShow]}/>) : ''}
                <div className="boxes">
                    {this.state.recipes.meal.map((mealObj, i) =>
                        <div key={i} id={i} className="recipe-box" onClick={(e)=>this.viewRecipe(e)}>
                            <img className="recipe-img" alt={mealObj.name} src={mealObj.image}/>
                            <h2 key={i}>{mealObj.name}</h2>
                            <em><p>{mealObj.method.slice(0, 250) + "..."}</p></em>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default AllRecipes