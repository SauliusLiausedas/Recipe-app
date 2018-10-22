import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import { Link } from 'react-router-dom'
import SelectedMeal from './selectedmeal.js'
import { getMealsByCategory } from '../../api/getRecipesApi.js'
// import fs from '../../firestoreService.js'

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
            getMealsByCategory(category).then(data => {
                this.setState({selectedCategoryMeals: data.meals})
            })
        } else {

        }
    }

    render() {
        if (this.state.selectedCategoryMeals) {
            if (!this.state.selectedMealId) {
                return (
                    <div>
                        {this.state.selectedCategoryMeals.map((mealObj, i) => {
                            return(
                                <div className="categoryBox" id={mealObj.idMeal} key={i}>
                                    <h3 className="categoryTitle">{mealObj.strMeal}</h3>
                                    <Link to={this.props.match.url + '/' + mealObj.idMeal}>
                                        <img className="categoryPic"
                                            alt={mealObj.strMeal} id={mealObj.idMeal}
                                            src={mealObj.strMealThumb}/>
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </div>
                )
            } else {
                return <SelectedMeal id={this.state.selectedMealId}/>
            }
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
    
    