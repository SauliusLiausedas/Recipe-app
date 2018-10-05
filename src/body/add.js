import React, {Component} from 'react'
import recipeDB from "../data.js"
import '../stylesheets/add.css'

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: {
                name: ""
            },
            newIngredients: {
                ingredients: ""
            },
            newMethod: {
                method: "",
            },
            newImage: {
                image: "",
            },
    }

}


addRecipe (e) {
    e.preventDefault();

    this.newMeal = {
        name: this.state.newName.name,
        ingredients: this.state.newIngredients.ingredients,
        method: this.state.newMethod.method,
        image: this.state.newImage.image,
    };

    console.log(this.newMeal)


    recipeDB.meal.push(this.state.newMeal)
    console.log(recipeDB)

    }


    render () {
        return (

        <form className="form">
            <ul>
                <li>
                    <label htmlFor="name">Recipe name!</label>
                    <input type="text" name="name"
                           onChange={(e) => this.setState({newName: {name: e.target.value}})} ></input>
                        <span>Enter your recipe NAME</span>
                </li>
                <li>
                    <label htmlFor="ingredients">Ingredients</label>
                    <input type="text" name="ingredients"
                           onChange={(e) => this.setState({newIngredients: {ingredients: e.target.value}})}></input>
                        <span>Enter all ingredients</span>
                </li>
                <li>
                    <label htmlFor="method">Method</label>
                    <input type="text" name="method" onChange={(e) => this.setState({newMethod: {method: e.target.value}})}></input>
                    <span>Write cooking method</span>
                </li>
                <li>
                    <label htmlFor="url">Image URL or Base64(prefered)</label>
                    <input type="text" name="url" onChange={(e) => this.setState({newImage: {image: e.target.value}})}></input>
                    <span>Your picture goes here!</span>
                </li>
                <li>
                    <input type="submit" value="Submit!" onClick={(e) => this.addRecipe(e)}></input>
                </li>
            </ul>
        </form>
        )
    }
}

export default Add;