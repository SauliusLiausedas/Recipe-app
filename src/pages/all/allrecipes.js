import React, {Component} from 'react'
import '../../stylesheets/allrecipes.css'
import ViewRecipe from './view.js'
import fs from '../../firestoreservice'
import { Link } from 'react-router-dom'
// import Error from '../../pages/error'

class AllRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: "",
            recipeToShow: "",
            currentPage: 1,
            recipesPerPage: 15
        }
    }

    componentWillMount() {
        let page = (this.props && this.props.match && this.props.match.params && this.props.match.params.page) || '';
        if(page) {
            this.setState({currentPage: page})
            this.changePage(page)
            let localRecipes= localStorage.getItem('recipes');
            if(true){
                fs.getCollection('recipes').then(recipes => {
                    localStorage.setItem('recipes', JSON.stringify(recipes));
                    this.setState({
                        recipes: recipes,
                    })
                })
            } else {
                this.setState({recipes : JSON.parse(localRecipes)});
            }

        }
    }

    showNext () {
        fs.getCollectionPage('recipes', ++this.state.currentPage).then(recipes => {
            this.setState({
                recipes: recipes,
            })
        })
        // this.setState({currentPage: Math.ceil(this.state.recipes.length / this.state.recipesPerPage)});
    }

    makePaginationControl() {
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
            <ul className="pageNumbers-ul">
                <Link className="pageNumbers" to={'/all/1'}><li className="pageNumbers" onClick={() => this.setState({currentPage: 1})}> &#8810; </li></Link>
                {pageNumbers.map(number => {
                return(
                    <Link key={number} className="pageNumbers" to={'/all/' + number}><li className={'pageNumbers ' + this.isActive(number)} key={number} id={number} onClick={(e) => this.changePage(e.target.id)}>{this.state.currentPage}</li></Link>
                )
            })}
                <Link className="pageNumbers" to={'/all/'+(this.state.currentPage+1)}><li className="pageNumbers" onClick={this.showNext.bind(this)}> &#8811; </li></Link>
            </ul>
        )
    }

    renderAllRecipes (){
        const indexOfLastRecipe = this.state.currentPage * this.state.recipesPerPage
        const indexOfFirstRecipe = indexOfLastRecipe - this.state.recipesPerPage
        const currentRecipes = this.state.recipes
        return (
            <div className="allRecipes">
                {this.state.recipeToShow ? (<ViewRecipe onClosePopup={() => {
                    this.setState({recipeToShow: ""})
                }} view={this.state.recipeToShow}/>) : ''}
                <div className="boxes">
                    {this.props.search ?
                        this.props.searchResult ?
                            this.props.searchResult.map((mealObj, i) => {
                            return(
                                <div key={i} id={i} className="recipe-box">
                                    <Link to={'/categories/' + mealObj.data.strCategory + '/' + mealObj.data.idMeal}>
                                        <img className="recipe-img" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/>
                                    </Link>
                                    <h2 className="mealName" key={i}>{mealObj.data.strMeal}</h2>
                                    <em><p>{mealObj.data.strInstructions.slice(0, 250) + "..."}</p></em>
                                </div>
                            )
                        })
                            :
                            <div><h1>What are you looking for?</h1></div>
                    :
                        currentRecipes.map((mealObj, i) => {
                                return(
                                    <div key={i} id={i} className="recipe-box">
                                        <Link to={'/categories/' + mealObj.data.strCategory + '/' + mealObj.data.idMeal}>
                                            <img className="recipe-img" alt={mealObj.data.strMeal} src={mealObj.data.strMealThumb}/>
                                        </Link>
                                        <h2 className="mealName" key={i}>{mealObj.data.strMeal}</h2>
                                        <em><p>{mealObj.data.strInstructions.slice(0, 250) + "..."}</p></em>
                                    </div>
                                )
                            })
                        }
                </div>
                {!this.props.search ? this.makePaginationControl() : ''}
            </div>
        )
    }

    isActive(id) {
        return ((id===this.state.currentPage) ? 'active' : '')
    }

    changePage(e) {
        this.isActive(e)
        this.setState({
            currentPage: Number(e)
        })
    }

    render() {
        if (this.state.recipes) {
            return(
                this.renderAllRecipes()
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

export default AllRecipes