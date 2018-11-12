import React, { Component } from 'react'
import '../../stylesheets/selectedMeal.css'
import fs from '../../firestoreservice'
import mongo from '../../mongoservice'
import { Link } from 'react-router-dom'

class SelectedMeal extends Component {
    constructor(){
        super()
        this.recipeToEdit = {}
        this.ingredientsToEdit = []
        this.measuresToEdit = []
        this.state = {
            mealById: "",
            ingredients: [],
            measures: [],
        }
    }

    componentWillMount() {
        let id = (this.props && this.props.match && this.props.match.params && this.props.match.params.id) || '';
        id = parseInt(id)
        mongo.getRecipeById(id).then(meal =>{
            Object.keys(meal[0]).filter((key)=>{
                this.setIngredientValue(key, meal, 'strIngredient', 'ingredients');
                this.setIngredientValue(key, meal, 'strMeasure', 'measures');
            })
            this.setState({mealById: meal});
        })
    }

    setIngredientValue(key, meal, value, arrayVal) {
        if (key.indexOf(value) !== -1 && meal[0][key]){
            this.state[arrayVal].push(meal[0][key]);
        }
    }

    enableEdit() {
        this.setState({edit: !this.state.edit})
        if(this.state.edit) {
            this.recipeToEdit = []
            this.state.ingredients = this.arrayClone(this.ingredientsToEdit)
            this.state.measures = this.arrayClone(this.measuresToEdit)
        } else {
            this.recipeToEdit = this.arrayClone(this.state.mealById)
            this.ingredientsToEdit = this.arrayClone(this.state.ingredients)
            this.measuresToEdit = this.arrayClone(this.state.measures)
        }
    }

    arrayClone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    instructionsHandleChange(e) {
        this.recipeToEdit[0].strInstructions = e.target.value
    }

    ingredientHandleChange (e, i, stateValue) {
        if(stateValue === 'ingredients') {
            this.recipeToEdit[0]['strIngredient' + (i + 1)] = e.target.value
        } else if(stateValue === 'measures') {
            this.recipeToEdit[0]['strMeasure' + (i + 1)] = e.target.value
        }
        this.state[stateValue][i] = e.target.value;
    }

    getIngredientsElement () {
        if (this.state.edit){
            return (<div>
                <ul className={'ingredientss-ul'}>
                    {this.state.ingredients.map((ingredient, i) => { return(
                        <li className={"ingredientsList editIngredients"} key={i}>
                            <input className={"ingredients width"} defaultValue={this.state.measures[i]}
                                   onChange={(e) => this.ingredientHandleChange(e, i, 'measures')} />
                            <input className={"ingredients width"} defaultValue={ingredient}
                                   onChange={(e) => this.ingredientHandleChange(e, i, 'ingredients')} />
                            <button className="edit btn addIngredientButton removeIngredientButton" onClick={() => this.addFields(false)}>-</button>
                        </li>
                    )})}
                    <button className="edit btn addIngredientButton" onClick={() => this.addFields(true)}>+</button>
                </ul>
            </div>)

        } else {
            return <div>
                <ul className={'ingredientss-ul'}>
                    {this.state.ingredients.map((ingredient, i) => { return(
                        <li className={"ingredientsList"} key={i}>{this.state.measures[i]} {ingredient}</li>
                    )})}
                </ul>
            </div>;
        }
    }

    // getNameElement(mealObj) {
    //     if(this.state.edit) {
    //         return <input className="ingredients" defaultValue={mealObj.data.strMeal}></input>
    //     } else {
    //         return <h2 className="ingredients">{mealObj.data.strMeal}</h2>
    //     }
    // }

    getInstructionsElement(mealObj) {
        if (this.state.edit) {
            return <textarea onChange={(e) => this.instructionsHandleChange(e)} className="instructions" rows="25" cols="50">{mealObj.strInstructions}</textarea>
        } else {
            return <p className="instructions">{mealObj.strInstructions}</p>
        }
    }

    getEditButtonValue () {
        if (this.state.edit){
            return 'Cancel'
        } else {
            return 'Edit'
        }
    }

    getAddSaveButton() {
        if (this.state.edit) {
            return (<button className="edit btn" onClick={() => this.saveAddButton()}>{this.getSaveButtonValue()}</button>)
        } else {
            return (<Link to={'/add'}><button className="edit btn" onClick={() => this.saveAddButton()}>{this.getSaveButtonValue()}</button></Link>)
        }
    }

    getSaveButtonValue() {
        if (this.state.edit){
            return 'Save'
        } else {
            return 'Add Recipe'
        }
    }

    saveAddButton() {
        if(this.state.edit){
            this.saveRecipe()
        } else {
            this.addRecipe()
        }
    }

    addRecipe() {

    }

    saveRecipe() {
        this.state.mealById = this.arrayClone(this.recipeToEdit)
        fs.createNewRecipe(this.recipeToEdit[0])
        this.setState({edit: false})
        this.recipeToEdit = []
    }

    render() {
        if(this.state.mealById){
            return(
                <div className="viewMeal">
                    {this.state.mealById.map((mealObj, i) => {
                        return(
                            <div key={i}>
                                <div className="mealViewGrid">
                                    <div>
                                        <h2 className="ingredients">Ingredients</h2>
                                        {this.getIngredientsElement()}
                                    </div>
                                    <div>
                                        {/*{this.getNameElement(mealObj)}*/}
                                        <h2 className="ingredients">{mealObj.strMeal}</h2>
                                        <img alt={mealObj.strMeal} className="mealImage" src={mealObj.strMealThumb} />
                                        <em><h3 className="category">{mealObj.strCategory} category</h3></em>
                                        <button className="edit btn" onClick={this.enableEdit.bind(this)}>{this.getEditButtonValue.bind(this)()}</button>
                                        {this.getAddSaveButton()}
                                    </div>
                                    <div>
                                        <h2 className="ingredients">Instructions</h2>
                                        {this.getInstructionsElement(mealObj)}
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