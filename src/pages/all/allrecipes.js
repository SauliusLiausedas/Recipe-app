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
            recipesPerPage: 9
        }
    }

    componentWillMount() {
        let page = (this.props && this.props.match && this.props.match.params && this.props.match.params.page) || '';
        this.setState({loading: true})
        // fs.getCount().then(recipeCount => {
        //     this.setState({recipesTotal: recipeCount.count})
        //     this.renderPageRecipes(page)
        // })

        //TODO get count of all recipes
        //TODO get first 10 recipes ( 10 is veriable which can be changed later)
        //TODO on pagination button click (number 2) open next 10 recipes
        mongo.getAllRecipes(5, 1).then((data) => {
            this.setState({
                recipes: data,
                currentPage: 1,
                loading: false
            })
        })
    }

    makePaginationControl() {
        let pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.recipesTotal / this.state.recipesPerPage); i++) {
            pageNumbers.push(i);
        }
        let pagesBefore = []
        let pagesAfter = []
        if (this.state.currentPage < 4) {
            pageNumbers = pageNumbers.splice(0, 5)
        } else if (this.state.currentPage > 3 && this.state.currentPage < pageNumbers.length - 1) {
            pagesBefore = pageNumbers.slice(this.state.currentPage - 3, this.state.currentPage)
            pagesAfter = pageNumbers.slice(this.state.currentPage, this.state.currentPage + 2)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else if (this.state.currentPage > 3 && this.state.currentPage < pageNumbers.length - 3) {
            pagesBefore = pageNumbers.slice(this.state.currentPage - 2, this.state.currentPage)
            pagesAfter = pageNumbers.splice(this.state.currentPage, 10)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else {
            pageNumbers = pageNumbers.splice(pageNumbers.length - 5)
        }

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

    renderPageRecipes(e) {
        this.setState({loading: true})
        // fs.getNumberOfRecipesById(this.state.recipesPerPage, e).then(recipes => {
        //     this.setState({
        //         recipes: recipes,
        //         currentPage: Number(e),
        //         loading: false
        //     })
        // })
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