import React, { Component } from 'react'
import '../../stylesheets/mealEdit.css'
import fs from '../../firestoreservice'
import help from '../../services/helperfunctions'

class MealEdit extends Component {
    constructor() {
        super()
        this.recipeCopy = {}
        this.state = {
            edit: false,
            recipeCopy: ''
        }
    }


    componentWillMount() {
        this.setState({recipe: this.props.mealById})
    }

    getEditButtonValue () {
        if (this.state.edit){
            return 'Cancel'
        } else {
            return 'Edit'
        }
    }

    enableEdit() {
        if(this.state.edit) {
            this.setState({recipe: this.recipeCopy})
            fs.updateRecipe(this.recipeCopy)
        } else {
            this.recipeCopy = this.state.recipe
        }
        this.setState({edit: !this.state.edit})
    }

    editRecipeElements(e) {
        const ingredientsToCheck = []
        const measuresToCheck = []
        for(let i = 1; i<14; i++) {
            ingredientsToCheck.push(('ingredient'+i))
            measuresToCheck.push(('measure'+i))
        }
        if(e.target.id === 'instructions') {
            this.recipeCopy[0].data.strInstructions = e.target.value
        } else if (e.target.id === 'name') {
            this.recipeCopy[0].data.strMeal = e.target.value
            // this.setState({recipe: {data: {strMeal: e.target.value}}})
        } else if (e.target.id === 'image') {
            this.recipeCopy[0].data.strMealThumb = e.target.value
            // this.setState({recipe: {data: {strMealThumb: e.target.value}}})
        } else if (ingredientsToCheck.includes(e.target.id)){
            switch (e.target.id) {
                case 'ingredient1':
                    this.recipeCopy[0].data.strIngredient1 = e.target.value
                    break;
                case 'ingredient2':
                    this.recipeCopy[0].data.strIngredient2 = e.target.value
                    break;
                case 'ingredient3':
                    this.recipeCopy[0].data.strIngredient3 = e.target.value
                    break;
                case 'ingredient4':
                    this.recipeCopy[0].data.strIngredient4 = e.target.value
                    break;
                case 'ingredient5':
                    this.recipeCopy[0].data.strIngredient5 = e.target.value
                    break;
                case 'ingredient6':
                    this.recipeCopy[0].data.strIngredient6 = e.target.value
                    break;
                case 'ingredient7':
                    this.recipeCopy[0].data.strIngredient7 = e.target.value
                    break;
                case 'ingredient8':
                    this.recipeCopy[0].data.strIngredient8 = e.target.value
                    break;
                case 'ingredient9':
                    this.recipeCopy[0].data.strIngredient9 = e.target.value
                    break;
                case 'ingredient10':
                    this.recipeCopy[0].data.strIngredient10 = e.target.value
                    break;
                case 'ingredient11':
                    this.recipeCopy[0].data.strIngredient11 = e.target.value
                    break;
                case 'ingredient12':
                    this.recipeCopy[0].data.strIngredient12 = e.target.value
                    break;
                case 'ingredient13':
                    this.recipeCopy[0].data.strIngredient13 = e.target.value
                    break;
                case 'ingredient14':
                    this.recipeCopy[0].data.strIngredient14 = e.target.value
                    break;
                default:
                    console.log('empty')
            }
        } else if (measuresToCheck.includes(e.target.id)) {
            switch (e.target.id) {
                case 'measure1':
                    this.recipeCopy[0].data.strMeasure1 = e.target.value
                    break;
                case 'measure2':
                    this.recipeCopy[0].data.strMeasure2 = e.target.value
                    break;
                case 'measure3':
                    this.recipeCopy[0].data.strMeasure3 = e.target.value
                    break;
                case 'measure4':
                    this.recipeCopy[0].data.strMeasure4 = e.target.value
                    break;
                case 'measure5':
                    this.recipeCopy[0].data.strMeasure5 = e.target.value
                    break;
                case 'measure6':
                    this.recipeCopy[0].data.strMeasure6 = e.target.value
                    break;
                case 'measure7':
                    this.recipeCopy[0].data.strMeasure7 = e.target.value
                    break;
                case 'measure8':
                    this.recipeCopy[0].data.strMeasure8 = e.target.value
                    break;
                case 'measure9':
                    this.recipeCopy[0].data.strMeasure9 = e.target.value
                    break;
                case 'measure10':
                    this.recipeCopy[0].data.strMeasure10 = e.target.value
                    break;
                case 'measure11':
                    this.recipeCopy[0].data.strMeasure11 = e.target.value
                    break;
                case 'measure12':
                    this.recipeCopy[0].data.strMeasure12 = e.target.value
                    break;
                case 'measure13':
                    this.recipeCopy[0].data.strMeasure13 = e.target.value
                    break;
                case 'measure14':
                    this.recipeCopy[0].data.strMeasure14 = e.target.value
                    break;
                default:
                    console.log('empty')
            }
        } else {
            console.log(ingredientsToCheck, e.target.id)
        }
    }

    render() {
        console.log(this.recipeCopy)
        if(!this.state.edit) {
            return (
                <div className="viewMeal">
                    {this.props.mealById.map((mealObj, i) => {
                        return (
                            <div key={i}>
                                <div className="mealViewGrid">
                                    <div className="viewRight">
                                        <h2 className="ingredients">Ingredients</h2>
                                        <div>
                                            <ul className={'ingredientss-ul' + this.props.ingredientsClass}>{this.props.ingredients.map((ingredient, i) => {
                                                return (<li className={"ingredientsList"} key={i}>{ingredient}</li>)
                                            })}</ul>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(e) => this.enableEdit(e)}>{this.getEditButtonValue.bind(this)()}</button>
                                        <h1 className="name">{mealObj.data.strMeal}</h1>
                                        <img alt={mealObj.data.strMeal} className="mealImage"
                                             src={mealObj.data.strMealThumb}/>
                                        <em><h3 className="category">{mealObj.data.strCategory} category</h3></em>
                                    </div>
                                    <div>
                                        <h2 className="ingredients">Instructions</h2>
                                        <p className="instructions">{mealObj.data.strInstructions}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="viewMeal">
                    {this.props.mealById.map((mealObj, i) => {
                        return (
                            <div key={i}>
                                <div className="mealViewGrid">
                                    <div>
                                        <h2 className="ingredients">Ingredients</h2>
                                        <div className="measures-ingredients">
                                            <div id="measures-div">
                                                <ul className={'ingredientss-ul'}>{this.props.measures.map((quantity,i) => {
                                                return(<input onChange={(e)=> this.editRecipeElements(e)} id={"measure"+(i+1)} className={"ingredientsList measuresList"} defaultValue={quantity} key={i} />)})}</ul>
                                            </div>
                                            <div id="ingredients-div">
                                                <ul className={'ingredientss-ul'}>{this.props.ingredients.map((ingredient, i) => {
                                                return(<input onChange={(e)=> this.editRecipeElements(e)} id={"ingredient"+(i+1)} className={"ingredientsList"} defaultValue={ingredient} key={i} />)})}</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(e) => this.enableEdit(e)}>{this.getEditButtonValue.bind(this)()}</button>
                                        <input onChange={(e)=> this.editRecipeElements(e)} id="name" defaultValue={mealObj.data.strMeal}/>
                                        <input onChange={(e)=> this.editRecipeElements(e)} id="image" className="mealImage" placeholder="Enter image URL or base64" defaultValue={mealObj.data.strMealThumb} />
                                        <em><h3 className="category">{mealObj.data.strCategory} category</h3></em>
                                    </div>
                                    <div>
                                        <h2 className="ingredients">Instructions</h2>
                                        <textarea rows="30" cols="70" id="instructions" onChange={(e)=> this.editRecipeElements(e)} className="instructionsEdit">{mealObj.data.strInstructions}</textarea>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

export default MealEdit