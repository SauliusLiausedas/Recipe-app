import React, {Component} from 'react'
import { getRandomRecipes } from "../api/getRecipesApi";
import '../stylesheets/homepage.css'

class Recipes extends Component {

    constructor(props) {
        super(props)
        let random = Math.floor(Math.random() * 10)
        getRandomRecipes(random).then (recipes => this.setState({recipes: recipes}))
        this.state = {
            recipes: "",
            recipesId: random,
            ingredients: ""
        }
    }

 generateRecipes() {
     let random = Math.floor(Math.random() * 10)
     getRandomRecipes(random).then(recipes => {
         this.setState({recipes: recipes})
     })
     this.setState({recipesId: random})
 }

    render() {
        if (this.state.recipes.meal) {
            return (
                <div>
                    <button onClick={() => this.generateRecipes()}>Recipes: {this.state.recipesId}</button>
                    {this.state.recipes.meal.map((mealObj, i) => {
                        return(
                            <div key={i} className="contentRecipe">
                                <img className="contentRecipePic" alt={mealObj.strMeal} src={mealObj.strMealThumb}/>
                                <div>
                                    <h2 className="contentRecipeTextTitle">{mealObj.strMeal}</h2>
                                    <p>{mealObj.strInstructions.slice(0, 250) + "..."}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    Loading
                </div>
            )
        }
    }
}

export default Recipes;