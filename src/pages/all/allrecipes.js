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

    componentWillMount() {

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

    viewRecipe(e) {
        // getRecipeById(e.currentTarget.id).then(recipe=> {
        //     this.recipeToView = recipe
        //     this.setState({recipeToShow: this.recipeToView})
        // })
        console.log(e);
    }

    renderAllRecipies (){
        return (
            <div className="allRecipes">
                {this.state.recipeToShow ? (<ViewRecipe onClosePopup={() => {
                    this.setState({recipeToShow: ""})
                }} view={this.state.recipeToShow}/>) : ''}
                <div className="boxes">
                    {this.state.recipes[(this.props.searchResult ? 'results' : 'meal')].map((mealObj, i) =>
                        <div key={i} id={i} className="recipe-box" onClick={(e) => this.viewRecipe(e)}>
                            <img className="recipe-img" alt={mealObj.name} src={mealObj.strMealThumb}/>
                            <h2 key={i}>{mealObj.strMeal}</h2>
                            <em><p>{mealObj.strInstructions.slice(0, 250) + "..."}</p></em>
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