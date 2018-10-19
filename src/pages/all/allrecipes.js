import React, {Component} from 'react'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'
import {getAllRecipes} from "../../api/getRecipesApi"

class AllRecipes extends Component {
    constructor() {
        super()
        this.allRecipes = {results: []}
        getAllRecipes().then(recipes => {
            this.allRecipes = recipes
            this.allRecipes.results = []
            this.setState({recipes: recipes})
        })
        this.state = {
            recipes: "",
            recipeToShow: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult) {
            this.setState({
                recipes: {
                    results: nextProps.searchResult
                }
            });
        }
    }

    renderAllRecipes (){
        return (
            <div className="allRecipes">
                {this.state.recipeToShow ? (<ViewRecipe onClosePopup={() => {
                    this.setState({recipeToShow: ""})
                }} view={this.state.recipeToShow}/>) : ''}
                <div className="boxes">
                    {this.state.recipes[(this.props.searchResult ? 'results' : 'meal')].map((mealObj, i) =>
                        <div key={i} id={i} className="recipe-box">
                            <img className="recipe-img" alt={mealObj.name} src={mealObj.strMealThumb}/>
                            <h2 className="mealName" key={i}>{mealObj.strMeal}</h2>
                            <em><p>{mealObj.strInstructions.slice(0, 250) + "..."}</p></em>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.recipes) {
            return this.renderAllRecipes()
        } else {
            return(
                <div className="preloader-div">
                    <img alt="Preloader" className="preloader" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                </div>
            )
        }
    }
}

export default AllRecipes