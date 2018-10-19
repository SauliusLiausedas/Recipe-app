import React, { Component } from 'react'
import { getByCategory } from '../../api/getRecipesApi.js'
import '../../stylesheets/selectedCategory.css'
import SelectedMeal from './selectedMeal.js'
import {Link} from "react-router-dom";
import Error from "../error";

class SelectedCategory extends Component {
    constructor() {
        super()
         this.state = {
             selectedCategoryMeals: '',
             selectedMealId: ""
         }
    }

    componentWillMount() {
        let category = (this.props && this.props.match && this.props.match.params && this.props.match.params.category) || '';
        if (category){
            getByCategory(category).then(categories => {
                this.setState({selectedCategoryMeals: categories.meals})
            })
        } else {
            return <Error/>
        }
    }

    render() {
         if (this.state.selectedCategoryMeals) {
             if (!this.state.selectedMealId){
                 return (
                     <div className="categoryMeals">
                         {this.state.selectedCategoryMeals.map((mealObj, i) => {
                             return (
                                 <div className="categoryMealBox" id={mealObj.idMeal} key={i}>
                                     <h1 className="categoryMealName">{mealObj.strMeal}</h1>
                                     <Link
                                         to={this.props.match.url + '/' + mealObj.idMeal}><img
                                         className="categoryMealImg"
                                         alt={mealObj.strMeal} id={mealObj.idMeal}
                                         src={mealObj.strMealThumb}/></Link>
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
             return(
                 <div className="preloader-div">
                     <img alt="Preloader" className="preloader" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                 </div>
             )
        }
    }
}

export default SelectedCategory