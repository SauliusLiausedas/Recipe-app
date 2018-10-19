import React, {Component} from 'react'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'
import fs from '../../firestoreservice'

class AllRecipes extends Component {
    constructor() {
        super()
        // this.allRecipes = {results: []}
        // getAllRecipes().then(recipes => {
        //     this.allRecipes.results = []
            // this.setState({recipes: recipes})
        // })
        this.state = {
            recipes: "",
            recipeToShow: "",
        }
    }

    componentWillMount() {
        fs.getCollection('recipes').then(recipes => {
            this.setState({recipes: recipes})
        })
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
                    {this.props.searchResult ?
                        this.props.searchResult.map((mealObj, i) =>
                                <div key={i} id={i} className="recipe-box">
                                    <img className="recipe-img" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/>
                                    <h2 className="mealName" key={i}>{mealObj.data.strMeal}</h2>
                                    <em><p>{mealObj.data.strInstructions.slice(0, 250) + "..."}</p></em>
                                </div>
                    )
                        :
                            this.state.recipes.map((mealObj, i) =>
                                <div key={i} id={i} className="recipe-box">
                                    <img className="recipe-img" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/>
                                    <h2 className="mealName" key={i}>{mealObj.data.strMeal}</h2>
                                    <em><p>{mealObj.data.strInstructions.slice(0, 250) + "..."}</p></em>
                                </div>)}
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