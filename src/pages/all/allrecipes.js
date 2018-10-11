import React, {Component} from 'react'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'
import {getAllRecipes} from "../../api/getRecipesApi"
import firestore from '../../services/firestoreService'

class AllRecipes extends Component {
    constructor() {
        super()
        this.recipeMethod = []
        this.allRecipes = {results: []}
        this.recipeToView = ""
        // getAllRecipes().then(recipes => {
        //     this.allRecipes = recipes
        //     this.allRecipes.results = []
        //     this.setState({recipes: this.allRecipes})
        // })
        firestore.getCollection('recipes').then((data)=>{
            console.log(data);
        });
        this.state = {
            recipes: "",
            recipeToShow: "",
        }
    }

    componentWillMount() {
        // if (this.props.searchResult && this.props.searchResult.length){
        //     this.allRecipes = this.props.searchResult;
        //     this.setState({recipes: this.allRecipes});
        // } else if (this.props.searchResult) {
        //     this.allRecipes.results = [];
        //     this.setState({recipes: this.allRecipes});
        // }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            recipes: {
                    results: nextProps.searchResult
                }
        });
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
                            <h2 key={i}>{mealObj.name}</h2>
                            <em><p>{console.log(mealObj)}{mealObj.strInstructions.slice(0, 250) + "..."}</p></em>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.recipes) {
            return <div>Loading</div>
        } else {
            return <div>Loading</div>
        }
    }
}

export default AllRecipes