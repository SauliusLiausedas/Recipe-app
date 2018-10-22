import React, {Component} from 'react'
// import {getAllRecipes} from "../../api/getRecipesApi"
import '../../stylesheets/homepage.css'
import fs from '../../firestoreService.js'

class AllRecipes extends Component {
    constructor() {
        super()
        this.initRecipes();
        this.state = {
            recipes: ""
        }
    }

    componentWillMount() {

    }

    async initRecipes() {
        let recipesFromFS = await fs.getCollection('recipes');
        let recipesArray = []
        for (let i=0; i<10; i++) {
            let randomFromArray = Math.floor(Math.random() * recipesFromFS.length)
            recipesArray.push(recipesFromFS[randomFromArray])
        }
        this.setState({recipes: recipesArray})
    }

    renderAllRecipies (){
        return (
            <div>
                <div>
                    {this.state.recipes.map((mealObj, i) =>
                        <div className="recipeBox" key={i} id={i}>
                            <img className="recipePic" alt={mealObj.name} src={mealObj.data.strMealThumb}/>
                            <div>
                                <h2 className="recipeTitle" key={i}>{mealObj.data.strMeal}</h2>
                                <h4>Category: {mealObj.data.strCategory}</h4>
                                <p>{mealObj.data.strInstructions}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.recipes) {
            return this.renderAllRecipies()
        } else {
            return <div>Loading</div>
        }
    }
}

export default AllRecipes