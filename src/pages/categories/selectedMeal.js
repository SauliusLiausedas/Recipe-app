import React, { Component } from 'react'
import '../../stylesheets/selectedMeal.css'
import { getById } from '../../api/getRecipesApi'
import {getFbMealById} from "../../api/firebaseApi";

class SelectedMeal extends Component {
    constructor(){
        super()
        this.state = {
            meal: "",
            ingredients: [],
            ingredientsClass: ''
        }
    }

    componentWillMount() {
        getFbMealById(this.props.id).then(meal => {
            console.log(meal);
            this.setState({meal: meal});
            this.getIngredients();
        })

        getById(this.props.id).then(meal => {
            console.log(meal);
        })
    }

    getIngredients() {
        if(this.state.meal) {
            for (let i = 1; i < 21; i++) {
                if(this.state.meal['strIngredient'+i] && this.state.meal['strMeasure'+i]) {
                    let ingredientToPush = [this.state.meal['strMeasure'+i], this.state.meal['strIngredient' + i]].join(" ")
                    this.state.ingredients.push(ingredientToPush);
                }
            }
            if(this.state.ingredients.length > 12) {
                this.setState({ingredientsClass: 'overflowHide'})
            }
        }
        this.repaint();
    }

    repaint () {
        this.setState({});
    }

    render() {
        if(this.state.meal){
            return(
                <div className="viewMeal">
                    <div className="mealViewGrid">
                        <div className="viewRight">
                            <h2 className="ingredients">Ingredients</h2>
                            <ul>{this.state.ingredients.map((ingredient, i) => { return(<li className={"ingredientsList" + this.state.ingredientsClass} key={i}>{ingredient}</li>)})}</ul>
                        </div>
                        <div className="viewLeft">
                            <h1 className="name">{this.state.meal.strMeal}</h1>
                            <img alt={this.state.meal.strMeal} className="mealImage" src={this.state.meal.strMealThumb} />
                            <em><h3 className="category">{this.state.meal.strCategory} category</h3></em>
                        </div>
                        <div>
                            <p className="instructions">{this.state.meal.strInstructions}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default SelectedMeal