import React, { Component } from 'react'
import '../stylesheets/categories.css'
const RECIPE_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const FILTER_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsList: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

componentWillMount() {
    fetch(RECIPE_CATEGORIES)
    .then(categories => {
        return categories.json();
    }).then(data => {
        let allCategories = data.categories.map((obj, i) => {
            return(
                <div key={i} className="categoryBox">
                    <h2 key={i} className="categoryTitle">{obj.strCategory}</h2>
                    <img className="categoryPic" alt={obj.strCategoryThumb} src={obj.strCategoryThumb}/>
                    <button onClick={this.handleClick}>Recipes</button>
                </div>
            )
        })
        this.setState({itemsList: allCategories})
    })
}

handleClick(strCategory){
    fetch(FILTER_BY_CATEGORY+strCategory)
    .then(meals => {
        return meals.json();
    }).then(data => {
        let allMeals = data.meals.map((obj, i) => {
            return(
                <div key={i} className="categoryBox">
                    <h2 key={i} className="categoryTitle">{obj.strMeal}</h2>
                    <img className="categoryPic" alt={obj.strMealThumb} src={obj.strMealThumb}/>
                </div>
            )
        })
        this.setState({itemsList: allMeals})
    })
}

render() {
    return(
        <div>
            {this.state.itemsList}
        </div>
    )
}

}

export default Categories;
