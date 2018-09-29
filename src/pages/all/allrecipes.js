import React, { Component } from 'react'
import recipeDB from '../../data.js'
import '../../stylesheets/allrecipes.css'

class AllRecipes extends Component {
    constructor(props) {
        super()
        this.names = [],
        this.ingredients = []
        this.state = {
            recipes: recipeDB,
        }
    }
    render() {
        for (let i=0; i<this.state.recipes.meal.length; i++) {
            this.names.push(this.state.recipes.meal[i].name)
            this.ingredients.push(this.state.recipes.meal[i].ingredients)
        }
        console.log(this.ingredients)
        return(
            <div className="allRecipes">
                {this.names.map((name, i) => <div key={i} className="listItem"><h1 className="listItemName">{name}</h1></div>)}
            </div>
        )
    }
}

export default AllRecipes