import React, {Component} from 'react'
import recipeDB from "../data.js"

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMeal: {
                id: '',
                name: '',
                ingredients: "",
                method: "",
                image: "",
            }


        }
    }
    addRecipe (e) {
        e.preventDefault()
        console.log(this.state.newMeal)
        recipeDB.meal.push(this.state.newMeal)
        console.log(recipeDB)

    }


    render () {
        return (

            <form className="form">

                <div className="form-group">

                    <input className="form-control" type="text" placeholder="name" name="name"
                           onChange={(e) => this.setState({newMeal: {name: e.target.value}})} ></input>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="ingredients" name="ingredients"
                           onChange={(e) => this.setState({newMeal: {ingredients: e.target.value}})}></input>
                </div>
                <div className="form-group">
                    <input className="form-control" name="method" type="text" placeholder="method"
                           onChange={(e) => this.setState({newMeal: {method: e.target.value}})}></input>
                </div>
                <div className="form-group">
                    <input className="form-control" name="image" type="text" placeholder="image"
                           onChange={(e) => this.setState({newMeal: {image: e.target.value}})}/>
                </div>
                <div className="form-group">


                    <button onClick={(e) => this.addRecipe(e)} >Submit!</button>
                </div>
            </form >
        )
    }
}

export default Add;