import React, {Component} from 'react'
import { getRandomRecipes} from "../api/getRecipesApi";
import fs from '../firestoreservice.js'

class Recipes extends Component {

    constructor(props) {
        super(props)
        fs.getCollection('recipesFromCategories').then(meals=> {
            this.setState({allRecipes: meals})
        })
        this.state = {
            allRecipes: '',
            recipesToShow: "",
            recipesId: "",
            ingredients: ""
        }
    }

    componentWillMount() {

    }

    generateRecipes() {
        if(this.state.allRecipes) {
            let random = Math.floor(Math.random() * 10) + 1
            let mealArr = []
            for (let i = 0; i < random; i++) {
                let randomFromArray = Math.floor(Math.random() * this.state.allRecipes.length)
                mealArr.push(this.state.allRecipes[randomFromArray])
            }
            this.setState({recipesToShow: mealArr})
            this.setState({recipesId: random})
        }
    }

    render() {
        if (this.state.recipesToShow) {
            return (
                <div>

                    <button className="recipeButton" onClick={() => this.generateRecipes()}>Now showing {this.state.recipesId} recipes</button>
                    {this.state.recipesToShow.map((mealObj ,i) => {
                        return(
                        <div key={i} className="contentRecipe">
                            <img className="contentRecipePic" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/>
                        <div>
                            <h2 className="contentRecipeTextTitle">{mealObj.data.strMeal}</h2>
                            <p>{mealObj.data.strInstructions.slice(0, 250) + "..."}</p>
                        </div>
                        </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    {this.generateRecipes()}
                    Loading...
                </div>
            )
        }
    }
}

export default Recipes;