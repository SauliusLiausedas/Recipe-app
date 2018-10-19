import React, { Component } from 'react'
import '../../stylesheets/selectedCategory.css'
import {Link} from "react-router-dom";
import Error from "../error";
import fs from "../../firestoreservice"

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
            fs.getRecipesByCategory(category).then(category => {
                this.setState({selectedCategoryMeals: category})
            })
        } else {
            return <Error/>
        }
    }

    render() {
         if (this.state.selectedCategoryMeals) {
             return (
                 <div className="categoryMeals">
                     {this.state.selectedCategoryMeals.map((mealObj, i) => {
                         return (
                             <div className="categoryMealBox" id={mealObj.data.idMeal} key={i}>
                                 <h1 className="categoryMealName">{mealObj.data.strMeal}</h1>
                                 <Link
                                     to={this.props.match.url + '/' + mealObj.data.idMeal}><img
                                     className="categoryMealImg"
                                     alt={mealObj.data.strMeal} id={mealObj.data.idMeal}
                                     src={mealObj.data.strMealThumb}/></Link>
                             </div>
                         )})
                     }
                 </div>
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

export default SelectedCategory