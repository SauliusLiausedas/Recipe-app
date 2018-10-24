import React, {Component} from 'react'
import '../stylesheets/homepage.css'
import fs from '../firestoreService.js'
import { Link } from 'react-router-dom'

class Recipes extends Component {

    constructor(props) {
        super(props)
        this.initRecipes();
        this.state = {
            allRecipes: "",
            recipesToShow: "",
            recipesId: "",
            ingredients: ""
        }
    }

    componentWillMount() {
        this.initRecipes();
    }

    componentDidMount() {

    }

    generateNewRecipes() {
        this.setState({recipesToShow: ""});
        this.initRecipes();
    }

    async initRecipes() {
        let meals = await fs.getCollection('recipes');
        let random = Math.floor(Math.random() *10) + 1
        let mealArr = []
        for (let i=0; i < random; i++) {
            let randomFromArray = Math.floor(Math.random() * meals.length)
            mealArr.push(meals[randomFromArray])
        }
        this.setState({recipesToShow: mealArr, recipesId: random})
    }

    render() {
        if (this.state.recipesToShow) {
            return (
                <div>
                    <button onClick={() => this.generateNewRecipes()}>Recipes: {this.state.recipesId}</button>
                    {this.state.recipesToShow.map((mealObj, i) => {
                        return(
                        <div key={i} className="recipeBox">
                            <Link to={'/categories/' + mealObj.data.strCategory + '/' + mealObj.data.idMeal}><img className="recipePic" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/></Link>
                        <div>
                            <h2 className="recipeTitle">{mealObj.data.strMeal}</h2>
                            <h4>Category: {mealObj.data.strCategory}</h4>
                            <p>{mealObj.data.strInstructions}</p>
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