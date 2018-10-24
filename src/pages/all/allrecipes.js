import React, {Component} from 'react'
// import {getAllRecipes} from "../../api/getRecipesApi"
// import ViewRecipe from '.view.js'
import '../../stylesheets/homepage.css'
import fs from '../../firestoreService.js'
import { Link } from 'react-router-dom'

class AllRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: "",
            recipeToShow: "",
            currentPage: 1,
            recipesPerPage: 10
        }
    }

    componentWillMount() {
        let page = (this.props && this.props.match && this.props.match.params && this.props.match.params.page) || '';
        if(page) {
            this.setState({currentPage: page})
            this.changePage(page)
            let localRecipes = localStorage.getItem('recipes');
            if(true) {
                fs.getCollection('recipes').then(data => {
                    localStorage.setItem('recipes', JSON.stringify(data));
                    this.setState({
                        recipes: data
                    })
                })
            } else {
                this.setState({recipes: JSON.parse(localRecipes)})
            }

        }
    }

    showNext () {
        fs.getCollectionPage('recipes', ++this.state.currentPage).then(data => {
            this.setState({
                recipes: data
            })
        })
        // this.setState({currentPage: Math.ceil(this.state.recipes.length / this.state.recipesPerPage)});
    }

    makePaginationControl () {
        let pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.recipes.length / this.state.recipesPerPage); i++) {
            pageNumbers.push(i);
        }
        let pagesBefore = []
        let pagesAfter = []
        if(this.state.currentPage < 4) {
            pageNumbers = pageNumbers.splice(0, 5)
        } else if (this.state.currentPage > 3 && this.state.currentPage < pageNumbers.length-1) {
            pagesBefore = pageNumbers.slice(this.state.currentPage-3, this.state.currentPage)
            pagesAfter = pageNumbers.slice(this.state.currentPage, this.state.currentPage+2)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else if (this.state.currentPage > 3 && this.state.currentPage < pageNumbers.length - 3) {
            pagesBefore = pageNumbers.slice(this.state.currentPage-2, this.state.currentPage)
            pagesAfter = pageNumbers.splice(this.state.currentPage, 10)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else {
            pageNumbers = pageNumbers.splice(pageNumbers.length-5)
        }
        return (
            <ul>
                <Link to={'/all/1'}><li onClick={() => this.setState({currentPage: 1})}> &#8810; </li></Link>
                {pageNumbers.map(number => {
                return(
                    <Link key={number} to={'/all/' + number}><li key={number} id={number} onClick={(e) => this.changePage(e.target.id)}>{this.state.currentPage}</li></Link>
                )
            })}
                <Link to={'/all/'+(this.state.currentPage+1)}><li onClick={this.showNext.bind(this)}> &#8811; </li></Link>
            </ul>
        )
    }


    renderAllRecipes (){
        const indexOfLastRecipe = this.state.currentPage * this.state.recipesPerPage
        const indexOfFirstRecipe = indexOfLastRecipe - this.state.recipesPerPage
        const currentRecipes = this.state.recipes
        return (
            <div>
                <div>
                    {currentRecipes.map((mealObj, i) =>
                        <div className="recipeBox" key={i} id={i}>
                        <Link to={'/categories' + mealObj.data.strCategory + '/' + mealObj.data.idMeal}>
                            <img className="recipePic" alt={mealObj.data.name} src={mealObj.data.strMealThumb}/>
                        </Link>
                            <div>
                                <h2 className="recipeTitle" key={i}>{mealObj.data.strMeal}</h2>
                                <h4>Category: {mealObj.data.strCategory}</h4>
                                <p>{mealObj.data.strInstructions}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    changePage(e) {
        this.setState({currentPage: Number(e)})
    }

    render() {
        if (this.state.recipes) {
            return this.renderAllRecipes()
        } else {
            return <div>Loading</div>
        }
    }
}

export default AllRecipes