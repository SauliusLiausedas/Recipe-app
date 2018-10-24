import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import fs from '../../firestoreService.js'
// import { getMealById } from '../../api/getRecipesApi.js'

class SelectedMeal extends Component {
    constructor() {
        super();
        this.state = {
            mealById: ""
        };
    }

    componentWillMount() {
        let id = this.props && this.props.match && this.props.match.params && this.props.match.params.id || '';
        let localId = localStorage.getItem(id);
        if (!localId) {
            fs.getRecipeById(id).then(data => {
                localStorage.setItem(id, JSON.stringify(data));
                this.setState({
                    mealById: data
                })
            }) 
        } else {
            this.setState({mealById: JSON.parse(localId)})
        }
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

makeContentEditable() {
    this.setState({edit: true})
}

getIngredients () {
    if (this.state.edit) {
        return (<div>Edit enabled</div>)
    } else {
        return (<div>Kodas ingredientams gauti</div>)
    }
}

    render() {
        if(this.state.mealById) {
            return (
                <div>
                    {this.state.mealById.map((mealObj, i) => {
                        return(
                            <div className="recipeBox">
                                <img className="recipePic" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/>
                                <div>
                                    <h2 className="recipeTitle">{mealObj.data.strMeal}</h2>
                                    <h4>Category: {mealObj.data.strCategory}</h4>                             
                                    <p>{mealObj.data.strInstructions}</p>
                                    {this.getIngredients}
                                    <button onClick={this.makeContentEditable.bind(this)}>EDIT</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <h1>Loading...</h1>
        }

    }
    
}

export default SelectedMeal;