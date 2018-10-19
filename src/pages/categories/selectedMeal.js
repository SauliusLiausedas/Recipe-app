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
        let id = (this.props && this.props.match && this.props.match.params && this.props.match.params.id) || '';
        getById(id).then(meal => {
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
                    {this.state.mealById.map((mealObj, i) => {
                        return(
                            <div key={i}>
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
            return(
                <div className="preloader-div">
                    <img alt="Preloader" className="preloader" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                </div>
            )
        }
    }
}

export default SelectedMeal