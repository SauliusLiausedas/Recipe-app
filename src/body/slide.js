import React, { Component } from 'react'
import '../stylesheets/slide.css'
// import Popup from './popup.js'
import recipeDB from '../data.js'
import Ingredients from './ingredients.js'

class Slide extends Component {

    constructor() {
        super()
        // this.ingredientsList = React.createRef()
        this.state = {
            slideRecipe: 0,
            recipes: recipeDB,
            full: "recipeMethod",
            edit: false,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.changeSlide()
        }, 10000);
    }

    changeSlide(e) {
        if (e === undefined) {
            if(this.state.slideRecipe < 3) {
                this.setState({slideRecipe: this.state.slideRecipe + 1})
            } else {
                this.setState({slideRecipe: 0})
            }
        } else {
            if(this.state.slideRecipe > 0) {
                this.setState({slideRecipe: this.state.slideRecipe - 1})
            } else {
                this.setState({slideRecipe: 3})
            }
        }

    }

    showFullText() {
        if(this.state.full === "recipeMethod") {
            this.setState({full: "recipeMethod full"})
        } else {
            this.setState({full: "recipeMethod"})
        }
    }

    startEdit() {
        clearInterval(this.interval)
        this.setState({edit: true})
    }

    render() {
        return (
            <div className="recipeSlide">
                {/*<Popup value={this.ingredientsList.current} visible={this.state.visibility}/>*/}
                <div className="recipeFrame">
                    <h1 className="symbol left" id="left" onClick={(e) => this.changeSlide(e)}> &lt; </h1>
                    <h1> {this.state.recipes.meal[this.state.slideRecipe].name} </h1>
                    <h1 className="symbol right" onClick={() => this.changeSlide()}> &gt; </h1>
                    <img alt={this.state.recipes.meal[this.state.slideRecipe].name}
                         src={this.state.recipes.meal[this.state.slideRecipe].image} className="recipeImg"></img>
                    <div className="ingredients" onClick={() => this.startEdit()}>
                        <Ingredients edit={this.state.edit} recipes={this.state.recipes} slideRecipe={this.state.slideRecipe}/>
                    </div>
                    <div className="text">
                        <p className={this.state.full}><a href="#!" onClick={() => this.showFullText()}> {this.state.recipes.meal[this.state.slideRecipe].method}</a></p>
                    </div>
                    {/*<button className="editBtn" onClick={(e) => this.editIngredients(e)}>Edit Ingredients</button>*/}
                </div>
            </div>
        );
    }
}

export default Slide;