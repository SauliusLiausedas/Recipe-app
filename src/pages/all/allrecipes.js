import React, {Component} from 'react'
import '../../stylesheets/allrecipes.css'
import SearchPage from '../search/searchPage'
import mongo from '../../mongoservice'
import {Link} from 'react-router-dom'

class AllRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: "",
            recipesTotal: '',
            recipeToShow: "",
            currentPage: 1,
            recipesPerPage: 9,
            recipesLength: 0
        }
    }

    async componentWillMount() {
        let page = (this.props && this.props.match && this.props.match.params && this.props.match.params.page) || '';
        this.setState({loading: true})

        let recipesLength = await mongo.getRecipesCount();
        console.log(recipesLength);
        this.state.recipesLength = recipesLength;
        let recipesArray = await mongo.getAllRecipes(this.state.recipesPerPage, 1);
        this.setState({
            recipes: recipesArray,
            currentPage: 1,
            loading: false
        })
    }

    createPageNumbers (){
        let pageNumbers = [];
        for (let i = 0; i < Math.ceil(this.state.recipesLength/10); i++){
            pageNumbers.push(i+1);
        }
        return pageNumbers;
    }

    makePaginationControl() {
        let pageNumbers = this.createPageNumbers();
        return (
            <ul className="pageNumbers-ul">
                <Link className="pageNumbers" to={'/all/1'}>
                    <li className="pageNumbers" id={1}
                        onClick={(e) => this.renderPageRecipes(e.target.id)}> &#8810; </li>
                </Link>
                {pageNumbers.map(number => {
                    return (
                        <Link key={number} to={'/all/' + number}>
                            <li className={'pageNumbers ' + this.isActive(number)} id={number}
                                onClick={(e) => this.renderPageRecipes(e.target.id)} key={number}>{number}</li>
                        </Link>
                    )
                })}
                <Link className="pageNumbers"
                      to={'/all/' + (Math.ceil(this.state.recipesTotal / this.state.recipesPerPage))}>
                    <li id={Math.ceil(this.state.recipesTotal / this.state.recipesPerPage)}
                        onClick={(e) => this.renderPageRecipes(e.target.id)} className="pageNumbers"> &#8811; </li>
                </Link>
            </ul>
        )
    }

    isActive(id) {
        return ((id === this.state.currentPage) ? 'active' : '')
    }

    renderPageRecipes(pageNumber) {
        this.setState({loading: true})

        mongo.getAllRecipes(this.state.recipesPerPage, Number(pageNumber)).then((data) => {
            this.setState({
                recipes: data,
                currentPage: Number(pageNumber),
                loading: false
            })
        })
    }

    renderAllRecipes() {
        return (
            <div className="allRecipes">
                <div className="boxes">
                    {this.props.search ?
                        <SearchPage searchResult={this.props.searchResult}/>
                        :
                        this.state.recipes.map((mealObj, i) => {
                            return (
                                <div key={i} id={i} className="recipe-box">
                                    <Link to={'/categories/' + mealObj.strCategory + '/' + mealObj.id}>
                                        <img className="recipe-img" alt={mealObj.strMeal} src={mealObj.strMealThumb}/>
                                    </Link>
                                    <h2 className="mealName" key={i}>{mealObj.strMeal}</h2>
                                    <em><p>{mealObj.strInstructions.slice(0, 250) + "..."}</p></em>
                                </div>
                            )
                        })
                    }
                </div>
                {!this.props.search ? this.makePaginationControl() : ''}
            </div>
        )
    }

    render() {
        if (!this.state.loading && this.state.recipes) {
            return (
                this.renderAllRecipes()
            )
        } else {
            return (
                <div className="preloader-div">
                    <img alt="Preloader" className="preloader"
                         src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                </div>
            )
        }
    }
}

export default AllRecipes