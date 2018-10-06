import React, { Component } from 'react'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'

class AllRecipes extends Component {
    constructor() {
        super()
        this.recipeMethod = []
        this.state = {
            recipes: window.recipeDB,
            recipeToShow: "",
        }
    }

    componentWillMount() {
        if (this.props.searchResult && this.props.searchResult.length){
            window.recipeDB.results = this.props.searchResult;
            this.setState({recipes: window.recipeDB});
        } else if (this.props.searchResult) {
            window.recipeDB.results = [];
            this.setState({recipes: window.recipeDB});
        }
    }

    componentWillReceiveProps(nextProps) {
        window.recipeDB.results = nextProps.searchResult;
       this.setState({recipes: window.recipeDB});
    }


    viewRecipe(e) {
        this.setState({recipeToShow: e.currentTarget.id})
    }

    hideEdit() {

    }

    render() {
        return (
            <div className="allRecipes">
                {this.state.recipeToShow ? (<ViewRecipe onClosePopup={() => {this.setState({recipeToShow: ""})}} view={this.state.recipes.meal[this.state.recipeToShow]}/>) : ''}
                <div className="boxes">
                    {this.state.recipes[(this.props.searchResult ? 'results' : 'meal')].map((mealObj, i) =>
                        <div key={i} id={i} className="recipe-box" onClick={(e)=>this.viewRecipe(e)}>
                            <img className="recipe-img" alt={mealObj.name} src={mealObj.image}/>
                            <h2 key={i}>{mealObj.name}</h2>
                            <em><p>{mealObj.method.slice(0, 250) + "..."}</p></em>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default AllRecipes