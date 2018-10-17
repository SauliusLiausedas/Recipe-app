import React, { Component } from 'react'
import '../stylesheets/categories.css'
import { Link } from 'react-router-dom'
import SelectedMeal from './selectedmeal.js'
import { getMealsByCategory } from '../api/getRecipesApi.js'

class SelectedCategory extends Component {
    constructor() {
        super();
        this.state = {
            selectedCategoryMealsList: [],
            selectedMealId: ''
        };
    }

    componentWillMount() {
        let category = this.props && this.props.match && this.props.match.params && this.props.match.params.category || '';
        if (category) {
            getMealsByCategory(category).then(data => {
                this.setState({selectedCategoryMealsList: data.meals})
            })
        } else {

        }
    }

    render() {
        if (this.state.selectedCategoryMealsList) {
            if (!this.state.selectedMealId) {
                return (
                    <div className="categoryBox">
                        {this.state.selectedCategoryMealsList.map((mealObj, i) => {
                            return(
                                <div id={mealObj.idMeal} key={i}>
                                    <h2 className="categoryTitle">{mealObj.strMeal}</h2>
                                    <Link to={'/categories/' + this.props.selectedCategory + '/' + this.state.selectedMealId}>
                                        <img className="categoryPic"
                                            onClick={(e) => this.setState({selectedMealId: e.target.id})}
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
            return <h1>testas II</h1>
        }
    }
 
}    
export default SelectedCategory;
    
    