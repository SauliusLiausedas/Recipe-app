import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import { Link } from 'react-router-dom'
// import { getMealsByCategory } from '../../api/getRecipesApi.js'
import fs from '../../firestoreService.js'

class SelectedCategory extends Component {
    constructor() {
        super();
        this.state = {
            selectedCategoryMeals: '',
            selectedMealId: ""
        };
    }

    componentWillMount() {
        let category = this.props && this.props.match && this.props.match.params && this.props.match.params.category || '';
        if (category) {
            fs.getRecipesByCategory(category).then(data => {
                this.setState({selectedCategoryMeals: data})
            })
//            getMealsByCategory(category).then(data => {
//                this.setState({selectedCategoryMeals: data.meals})
//            })
        } else {
            
        }
    }

    componentWillMount() {
        let category = this.props && this.props.match && this.props.match.params && this.props.match.params.category || '';
        if (category) {

            let localRecipes = localStorage.getItem(category);
                if(!localRecipes) {
                    fs.getRecipesByCategory(category).then(data => {
                    localStorage.setItem(category, JSON.stringify(data));
                    this.setState({
                        selectedCategoryMeals: data
                    })
                    }) 
                } else {
                    this.setState({selectedCategoryMeals: JSON.parse(localRecipes)})
                }

        } else {

        }
    }      

    render() {
        if (this.state.selectedCategoryMeals) {
                return (
                    <div>
                        {this.state.selectedCategoryMeals.map((mealObj, i) => {
                            return(
                                <div className="categoryBox" id={mealObj.data.idMeal} key={i}>
                                    <h3 className="categoryTitle">{mealObj.data.strMeal}</h3>
                                    <Link to={this.props.match.url + '/' + mealObj.data.idMeal}>
                                        <img className="categoryPic"
                                            alt={mealObj.data.strMeal} id={mealObj.data.idMeal}
                                            src={mealObj.data.strMealThumb}/>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
 
}    
export default SelectedCategory;
    
    