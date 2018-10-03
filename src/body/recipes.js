import React, {Component} from 'react'
import recipeDB from '../data.js'

/*
class Recipes extends Component {
    render() { 
      return (
        <div>
            <div className="contentRecipe">
                <img src={recipeDB.meal[2].image} className="contentRecipePic" alt="recipePic"/>
                <div className="contentRecipeText">
                    <h2 className="contentRecipeTextTitle">{recipeDB.meal[2].name}</h2>
                    <ul>
                        {recipeDB.meal[2].ingredients.map(item => <li>{item}</li>)} 
                    </ul>
                    <p>{recipeDB.meal[2].method}</p>
                </div>
            </div>
            <div className="contentRecipe">
                <img src={recipeDB.meal[5].image} className="contentRecipePic" alt="recipePic"/>
                <div className="contentRecipeText">
                    <h2 className="contentRecipeTextTitle">{recipeDB.meal[5].name}</h2>
                    <ul>
                        {recipeDB.meal[5].ingredients.map(item => <li>{item}</li>)} 
                    </ul>
                    <p>{recipeDB.meal[5].method}</p>
                </div>
            </div>
            <div className="contentRecipe">
                <img src={recipeDB.meal[8].image} className="contentRecipePic" alt="recipePic"/>
                <div className="contentRecipeText">
                    <h2 className="contentRecipeTextTitle">{recipeDB.meal[8].name}</h2>
                    <ul>
                        {recipeDB.meal[8].ingredients.map(item => <li>{item}</li>)} 
                    </ul>
                    <p>{recipeDB.meal[8].method}</p>
                </div>
            </div>
        </div>
      )
    }
  }
*/

class Recipes extends Component {
    constructor() {
        super()
        /* this.recipeNames = []
        this.recipeIngredients = []
        this.recipeMethod = []
        this.recipeImg = [] */
        this.state = {
            recipes: recipeDB
        }
    }

    render() {
        return (
            <div>
                {this.state.recipes.meal.map(mealObj =>
                    <div className="contentRecipe">
                        <img className="contentRecipePic" alt="recipePic" src={mealObj.image}/>
                        <div>
                            <h2 className="contentRecipeTextTitle">{mealObj.name}</h2>
                            <ul>
                                {mealObj.ingredients.map(item => <li>{item}</li>)} 
                            </ul>
                            <p>{mealObj.method.slice(0, 250) + "..."}</p>
                        </div>
                    </div>
                ).slice(0, 3)}
            </div>
        )
    }
}

  export default Recipes;