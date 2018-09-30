import React, { Component } from 'react'
import '../stylesheets/ingredients.css'

class Ingredients extends Component {
    constructor(props) {
        super()
        this.state = {
            edit: false,
            inputValues: []
        }
    }

    changeIngredient(e) {
        const currentIngredients = this.state.inputValues
        currentIngredients[e.target.id] = e.target.value
        // this.inputValuesOld[e.target.id] = e.target.defaultValue
    }

    showIngredients() {

        if(this.state.edit === false) {
            this.state.inputValues = this.props.recipes.meal[this.props.slideRecipe].ingredients
            return(
                <ul ref={this.ingredientsList} className="recipeIngredients">
                    {this.props.recipes.meal[this.props.slideRecipe].ingredients.map((ingredient, i) =>
                        <li className="list" key={i}>{ingredient}</li>)}
                </ul>
            );
        } else {
            return(
                <ul className="edit-ul">
                    {this.state.inputValues.map((ingredient, i) => <li className="ingredients-li" key={i}><input className="ingredientsInput" id={i} onChange={(e) => this.changeIngredient(e)} defaultValue={ingredient}></input></li>)}
                </ul>
            );
        }
    }

    // handleDoubleClick() {
    //     this.setState({edit: true})
    // }

    buttonClick() {
        console.log(this.state.edit)
        if(this.state.edit === false) {
            this.setState({edit: true})
        } else {
            this.setState({edit: false})
        }
    }

    render(){
        return (
            <div>
                {this.showIngredients()}
                <button className="btn editBtn" onClick={() => this.buttonClick()}> {this.state.edit ? "Save" : "Edit"} </button>
            </div>
        );
    }
}

export default Ingredients