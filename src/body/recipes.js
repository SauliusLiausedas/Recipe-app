import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import fs from '../firestoreservice.js'

class Recipes extends Component {

    constructor() {
        super()
        this.recipes = []
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
        // this.setState({recipesToShow: ""});
        this.initRecipes();
    }

    async initRecipes() {
        this.setState({loading: true})
        fs.getCount().then(count => {
            let recipeCount = Math.floor(Math.random() * count.count)
            let randomQuantity = Math.floor(Math.random() * 10) + 1
            fs.getRandomRecipe(recipeCount, randomQuantity).then(data => {
                this.setState({recipesToShow: data, recipesId: randomQuantity, loading: false})
            })
        })
        // let meals = await fs.getCollection('recipes');
        //
        // let random = Math.floor(Math.random() * 10) + 1
        // let mealArr = []
        // for (let i = 0; i < random; i++) {
        //     let randomFromArray = Math.floor(Math.random() * meals.length)
        //     mealArr.push(meals[randomFromArray])
        // }
        // this.setState({recipesToShow: mealArr, recipesId: random})

    }

    render() {
        if (!this.state.loading) {
            return (
                <div>
                    <button className="recipeButton" onClick={() => this.generateNewRecipes()}>Now showing {this.state.recipesId} recipes</button>
                    {this.state.recipesToShow.map((mealObj ,i) => {
                        return(
                        <div key={i} className="contentRecipe">
                            <Link to={'/categories/' + mealObj.strCategory + '/' + mealObj.idMeal}><img className="contentRecipePic" alt={mealObj.strMeal} src={mealObj.strMealThumb}/></Link>
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
                    <img alt="Preloader" className="preloader" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                </div>
            )
        }
    }
}

export default Recipes;