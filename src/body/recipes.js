import React, {Component} from 'react'
import {getAllRecipes, getRecipeById } from "../api/getRecipesApi";

class Recipes extends Component {

    constructor(props) {

        super(props)
        this.allRecipes = ""
        getAllRecipes().then(recipes => {
            this.allRecipes = recipes
        })

        this.state = {
            recipes: "",
            recipesId: []
        }
        if (this.state.recipes) {
            this.state.recipesId = this.getMyIndexesToShow();
        }
        this.handleClick = this.handleClick.bind(this);
    }

    getMyIndexesToShow() {
        let myIndexesToShow = [];
        let randomNumber = Math.floor(Math.random() * 9);
        for (let i = 0; i < randomNumber; i++) {
            let myNewRandomNumber = Math.floor(Math.random() * (this.state.recipes.meal.length));
            // let isMyRandomNumberInRandomArray = myIndexesToShow.indexOf(myNewRandomNumber) !== -1;
            // if (isMyRandomNumberInRandomArray) {
            //     i--;
            // } else {
            //     myIndexesToShow.push(myNewRandomNumber);
            // }
            myIndexesToShow.push(myNewRandomNumber);
        }

        return myIndexesToShow;
    }

    getRandomObjects() {
        return this.state.recipes.meal.filter((mealObj, index) => {
                return this.state.recipesId.indexOf(index) !== -1
            }
        )
    }

    getRender(mealObj, i) {
        return (
            <div key={i} className="contentRecipe">
                <img className="contentRecipePic" alt={mealObj.name} src={mealObj.image}/>
                <div>
                    <h2 className="contentRecipeTextTitle">{mealObj.name}</h2>
                    <ul>
                        {mealObj.ingredients.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <p>{mealObj.method.slice(0, 250) + "..."}</p>
                </div>
            </div>)
    }

    showNewRender() {
        return this.getRandomObjects().map((mealObj, i) => this.getRender(mealObj, i));
    }

    handleClick() {
        this.setState({
            recipesId: this.getMyIndexesToShow()
        });
    }

    setRecipes() {
        this.setState({recipes: this.allRecipes})
    }

    render() {
        if (this.state.recipes) {
            return (
                <div>
                    <button onClick={this.handleClick}>
                        Recipes: {this.state.recipesId.length}
                    </button>
                    <div>
                        {this.showNewRender()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={() => this.setRecipes()}>LoadData</button>
                </div>
            )
        }
    }
}

export default Recipes;