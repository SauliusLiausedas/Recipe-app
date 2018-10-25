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
            measures: [],
            allIngredients: []
        }
    }

    componentWillMount() {
        let id = (this.props && this.props.match && this.props.match.params && this.props.match.params.id) || '';
        let myMeal = localStorage.getItem('meal');
        let allIngredients = []
        if (myMeal){
            let meal = JSON.parse(myMeal);
            Object.keys(meal[0].data).filter((key)=>{
                this.setIngredientValue(key, meal, 'strIngredient', 'ingredients');
                this.setIngredientValue(key, meal, 'strMeasure', 'measures');
            })
            this.setState({mealById: meal});
            for(let i=0; i<this.state.ingredients.length; i++) {
                allIngredients.push(this.state.measures[i] + this.state.ingredients[i])
            }
            this.setState({allIngredients: allIngredients})
        } else {
            fs.getRecipeById(id).then(meal => {
                localStorage.setItem('meal', JSON.stringify(meal));
                Object.keys(meal[0].data).filter((key)=>{
                    this.setIngredientValue(key, meal, 'strIngredient', 'ingredients');
                    this.setIngredientValue(key, meal, 'strMeasure', 'measures');
                })
                this.setState({mealById: meal});
                for(let i=0; i<this.state.ingredients.length; i++) {
                    allIngredients.push(this.state.measures[i] + this.state.ingredients[i])
                }
                this.setState({allIngredients: allIngredients})
            })
        }

    }

    setIngredientValue(key, meal, value, arrayVal) {
        if (key.indexOf(value) !== -1 && meal[0].data[key]){
            this.state[arrayVal].push(meal[0].data[key]);
        }
    }

    enableEdit() {
        this.setState({edit: !this.state.edit})
    }

    ingredientHandleChange (e, i, stateValue) {
        this.state[stateValue][i] = e.target.value;
        this.setState({});
    }

    getIngredientsElement () {
        if (this.state.edit){
            return (<div>
                <ul className={'ingredientss-ul' + this.state.ingredientsClass}>
                    {this.state.ingredients.map((ingredient, i) => { return(
                        <li className={"ingredientsList"} key={i}>
                            <input value={this.state.measures[i]}
                                   onChange={(e) => this.ingredientHandleChange(e, i, 'measures')} />
                            <input value={ingredient}
                                   onChange={(e) => this.ingredientHandleChange(e, i, 'ingredients')} />
                        </li>
                    )})}
                    {this.state.measures.map((measure, i) => { return(
                        <li className={"ingredientsList"} key={i}>
                            <input value={measure}
                                   onChange={(e) => this.ingredientHandleChange(e, i)} />
                        </li>
                    )})}
                </ul>
            </div>)

        } else {
            return <div>
                <ul className={'ingredientss-ul' + this.state.ingredientsClass}>
                    {this.state.ingredients.map((ingredient, i) => { return(
                        <li className={"ingredientsList"} key={i}>{this.state.measures[i]} {ingredient}</li>
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