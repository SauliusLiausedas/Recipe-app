import React, { Component } from 'react'
import recipeDB from '../../data.js'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'
import SearchBar from './searchBar.js'
import Items from './items.js'

class AllRecipes extends Component {
    constructor(props) {
        super()
        this.recipeMethod = []
        this.state = {
            recipes: recipeDB,
            recipeToShow: "",
            popup: " visible",
            search: false,
            searchText: ""
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({recipes: recipeDB})
    //     recipeDB.results = this.props.searchResult;
    // }

    // componentWillMount() {
    //     if (this.props.searchResult.length) {
    //         recipeDB.results = this.props.searchResult;
    //         this.setState({recipes: recipeDB});
    //     } else if (this.props.searchResult) {
    //         recipeDB.results = [];
    //         this.setState({recipes: recipeDB});
    //     }
    // }

    // componentWillMount() {
    //     if(this.props.searchResult) {
    //         recipeDB.results = []
    //         this.setState({recipes: recipeDB})
    //     }
        // else {
        //     recipeDB.results = this.props.searchResult;
        // }
        // else {
        //     recipeDB.results = this.props.searchResult
        //     this.setState({recipes: recipeDB})
        // }
    // }

    viewRecipe(e) {
        this.setState({recipeToShow: e.currentTarget.id})
    }

    hideEdit() {
        if (this.state.popup === " visible") {
            this.setState({popup: " "})
        } else {
            this.setState({popup: " visible"})
        }
    }

    render() {
        if(this.state.recipes) {
            return (
                <div className="allRecipes" onClick={() => (this.hideEdit())}>
                    <SearchBar onTextChange={(text) => {
                        this.setState({searchText: text})
                    }}/>
                    {this.state.recipeToShow ? (<ViewRecipe view={this.state.recipes.meal[this.state.recipeToShow]}
                                                            popup={this.state.popup}/>) : ''}
                    {/*{this.props.view ? (<ViewRecipe view={this.state.recipeToShow}/>) : ""}*/}

                    <div className="boxes">
                        {/*{this.state.recipes[(this.props.searchResult ? 'results' : 'meal')].map((mealObj, i) =>*/}
                        {/*{this.state.recipes[this.props.recipeToShow].map((mealObj, i) =>*/}
                        {this.state.recipes.meal.filter((mealObj) => mealObj.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                            ).map((mealObj, i) =>
                            <div key={i} id={i} className="recipe-box" onClick={(e) => this.viewRecipe(e)}>
                                <img className="recipe-img" alt={mealObj.name} src={mealObj.image}/>
                                <h2 key={i}>{mealObj.name}</h2>
                                <em><p>{mealObj.method.slice(0, 250) + "..."}</p></em>
                            </div>
                        )}
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <h1> Loading...</h1>
                </div>
            )
        }
    }
}

export default AllRecipes