import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import { getMealById } from '../../api/getRecipesApi.js'

class SelectedMeal extends Component {
    constructor() {
        super();
        this.state = {
            mealById: ""
        };
    }

    componentWillMount() {
        let id = this.props && this.props.match && this.props.match.params && this.props.match.params.id || '';
        getMealById(id).then(meal => {
            this.setState({mealbyId: meal.meals});
            this.getIngredients();
        })
    }

    getIngredients() {
        this.repaint();
    }

    repaint() {
        this.setState({});
    }

/*
    getIngredients() {
        if(this.state.mealById[0]) {
            for (let i=1; i<21; i++) {
                if(this.state.mealById[0]['strIngredient'+i] && this.state.mealById[0]['strMeasure'+i]) {
                    let ingredientToPush = [this.state.mealById[0]['strMeasure'+i], this.state.mealById[0]['strIngredient'+i]].join(" ")
                    this.state.ingredients.push(ingredientToPush);
                }
            }
            if(this.state.ingredients.length > 12) {
                this.setState({ingredientsClass: 'overflowHide'})
            }
        }
        this.repaint();
    }

    repaint() {
        this.setState({});
    }
*/
    render() {
        if(this.state.mealById) {
            return (
                <div className="categoryBox">
                    {this.state.mealById.map((mealObj, i) => {
                        return(
                            <div>
                                <h2 className="categoryTitle">{mealObj.strMeal}</h2>
                                <img className="categoryPic" alt={mealObj.strMeal} src={mealObj.strMealThumb}/>
                                <p>{mealObj.strInstructions}</p>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <h1>testas III</h1>
        }

    }
    
}

export default SelectedMeal;