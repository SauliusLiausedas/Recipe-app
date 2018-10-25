import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import fs from '../firestoreservice.js'

class Recipes extends Component {

    constructor() {
        super()
        this.state = {
            allRecipes: '',
            recipesToShow: "",
            recipesId: "",
            ingredients: ""
        }
    }

    componentWillMount() {
        this.initRecipes();
    }

    generateNewRecipes () {
        this.setState({recipesToShow: ""});
        this.initRecipes();
    }

    async initRecipes() {
        let meals = await fs.getCollection('recipes');

        let random = Math.floor(Math.random() * 10) + 1
        let mealArr = []
        for (let i = 0; i < random; i++) {
            let randomFromArray = Math.floor(Math.random() * meals.length)
            mealArr.push(meals[randomFromArray])
        }
        this.setState({recipesToShow: mealArr, recipesId: random})

    }

    render() {
        if (this.state.recipesToShow) {
            return (
                <div>
                    <button className="recipeButton" onClick={() => this.generateNewRecipes()}>Now showing {this.state.recipesId} recipes</button>
                    {this.state.recipesToShow.map((mealObj ,i) => {
                        return(
                        <div key={i} className="contentRecipe">
                            <Link to={'/categories/' + mealObj.data.strCategory + '/' + mealObj.data.idMeal}><img className="contentRecipePic" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/></Link>
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
                <div className={this.state.loader}>
                    <img alt="Preloader" className="preloader" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                </div>
            )
        }
    }
}

export default Recipes;