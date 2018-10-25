import React, { Component } from 'react'
import '../../stylesheets/selectedMeal.css'
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

            let correctKeys = Object.keys(meal[0].data).filter((key)=>{
                this.setIngredientValue(key, meal, 'strIngredient', 'ingredients');
                this.setIngredientValue(key, meal, 'strMeasure', 'measures');
            })
            this.setState({mealById: meal});
        })
    }

    setIngredientValue(key, meal, value, arrayVal) {
        if (key.indexOf(value) !== -1){
            this.state[arrayVal].push(meal[0].data[key]);
        }
    }

    enableEdit() {
        this.setState({edit: !this.state.edit})
    }

    ingredientHandleChange (e, i) {
        this.state.ingredients[i] = e.target.value;
        this.setState({});
    }

    getIngredientsElement () {
        if (this.state.edit){
            return (<div>
                <ul className={'ingredientss-ul' + this.state.ingredientsClass}>
                    {this.state.ingredients.map((ingredient, i) => { return(
                        <li className={"ingredientsList"} key={i}>
                            <input value={ingredient}
                                   onChange={(e) => this.ingredientHandleChange(e, i)} />
                        </li>
                    )})}
                </ul>
            </div>)

        } else {
            return <div>
                <ul className={'ingredientss-ul' + this.state.ingredientsClass}>
                    {this.state.ingredients.map((ingredient, i) => { return(
                        <li className={"ingredientsList"} key={i}>{ingredient}</li>
                    )})}
                </ul>
            </div>;
        }
    }

    getEditButtonValue () {
        if (this.state.edit){
            return 'Cancel'
        } else {
            return 'Edit'
        }
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
                                        {this.getIngredientsElement.bind(this)()}
                                    </div>
                                    <div className="viewLeft">
                                        <button onClick={this.enableEdit.bind(this)}>{this.getEditButtonValue.bind(this)()}</button>
                                        <h1 className="name">{mealObj.data.strMeal}</h1>
                                        <img alt={mealObj.data.strMeal} className="mealImage" src={mealObj.data.strMealThumb} />
                                        <em><h3 className="category">{mealObj.data.strCategory} category</h3></em>
                                    </div>
                                    <div>
                                        <p className="instructions">{mealObj.data.strInstructions}</p>
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