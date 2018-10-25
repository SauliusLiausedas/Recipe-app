import React, { Component } from 'react'
import '../../stylesheets/selectedMeal.css'
import MealEdit from './mealEdit'
import fs from '../../firestoreservice'

class SelectedMeal extends Component {
    constructor(){
        super()
        this.state = {
            mealById: "",
            ingredients: [],
            ingredientsClass: '',
            measures: []
        }
    }

    componentWillMount() {
        let id = (this.props && this.props.match && this.props.match.params && this.props.match.params.id) || '';
        fs.getRecipeById(id).then(meal => {
            this.setState({mealById: meal});
            this.generateIngredients();
        })
    }

    generateIngredients() {
            for (let i = 1; i < 21; i++) {
                if(this.state.mealById[0].data['strIngredient'+i] && this.state.mealById[0].data['strMeasure'+i]) {
                    let ingredientToPush = [this.state.mealById[0].data['strMeasure'+i], this.state.mealById[0].data['strIngredient' + i]].join(" ")
                    let measureToPush = [this.state.mealById[0].data['strMeasure'+i]]
                    this.state.ingredients.push(ingredientToPush)
                    this.state.measures.push(measureToPush)
                }
            }
            if(this.state.ingredients.length > 15) {
                this.setState({ingredientsClass: ' overflowHide'})
            }
        this.repaint();
    }

    repaint () {
        this.setState({});
    }

    render() {
        if(this.state.mealById){
            return <MealEdit mealById={this.state.mealById} measures={this.state.measures} ingredients={this.state.ingredients} ingredientsClass={this.state.ingredientsClass}/>
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