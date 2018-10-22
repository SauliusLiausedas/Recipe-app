import React, {Component} from 'react'
import ViewRecipe from './view.js'
import {getAllRecipes} from "../../api/getRecipesApi"
import '../../stylesheets/homepage.css'

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
            recipeToShow: ""
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
            <div>
                {this.state.recipeToShow ? (<ViewRecipe onClosePopup={() => {
                    this.setState({recipeToShow: ""})
                }} view={this.state.recipeToShow}/>) : ''}
                <div>
                    {this.state.recipes[(this.props.searchResult ? 'results' : 'meal')].map((mealObj, i) =>
                        <div className="recipeBox" key={i} id={i} onClick={(e) => this.viewRecipe(e)}>
                            <img className="recipePic" alt={mealObj.name} src={mealObj.strMealThumb}/>
                            <div>
                                <h2 className="recipeTitle" key={i}>{mealObj.strMeal}</h2>
                                <h4>Category: {mealObj.strCategory}</h4>
                                <p>{mealObj.strInstructions}</p>
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