import React, { Component } from 'react'
import '../../stylesheets/selectedMeal.css'
import { getById } from '../../api/getRecipesApi'

class SelectedMeal extends Component {
    constructor(){
        super()
        this.state = {
            mealById: "",
            ingredients: [],
            ingredientsClass: ''
        }
    }

    componentWillMount() {
        console.log(this.props)
        getById(this.props.id).then(meal => {
            this.setState({mealById: meal.meals});
            this.getIngredients();
        })
    }

    getIngredients() {
        if(this.state.mealById[0]) {
            for (let i = 1; i < 21; i++) {
                if(this.state.mealById[0]['strIngredient'+i] && this.state.mealById[0]['strMeasure'+i]) {
                    let ingredientToPush = [this.state.mealById[0]['strMeasure'+i], this.state.mealById[0]['strIngredient' + i]].join(" ")
                    this.state.ingredients.push(ingredientToPush);
                }
            }
            if(this.state.ingredients.length > 12) {
                this.setState({ingredientsClass: ' overflowHide'})
            }
        }
        this.repaint();
    }

    repaint () {
        this.setState({});
    }

    render() {
        if(this.state.mealById){
            return(
                <div className="viewMeal">
                    {console.log(this.props.router)}
                    {this.state.mealById.map((mealObj, i) => {
                        return(
                            <div>
                                <div className="mealViewGrid">
                                    <div className="viewRight">
                                        <h2 className="ingredients">Ingredients</h2>
                                        <ul className={this.state.ingredientsClass}>{this.state.ingredients.map((ingredient, i) => { return(<li className={"ingredientsList"} key={i}>{ingredient}</li>)})}</ul>
                                    </div>
                                    <div className="viewLeft">
                                        <h1 className="name">{mealObj.strMeal}</h1>
                                        <img alt={mealObj.strMeal} className="mealImage" src={mealObj.strMealThumb} />
                                        <em><h3 className="category">{mealObj.strCategory} category</h3></em>
                                    </div>
                                    <div>
                                        <p className="instructions">{mealObj.strInstructions}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    NERA
                </div>
            )
        }
    }
}

export default SelectedMeal