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

    render() {
        return (
            <div className="allRecipes">
                <div className="boxes">
                    {this.state.recipes.meal.map((mealObj, i) =>
                        <div key={i} className="recipe-box">
                            <img className="recipe-img" alt={mealObj.name} src={mealObj.image}/>
                            <h2 key={i}>{mealObj.name}</h2>
                            <p>{mealObj.method.slice(0, 250) + "..."}</p>
                        </div>
                    ).slice(0, 3)}
                </div>
            </div>
        )
    }
}
  
  export default Recipes;