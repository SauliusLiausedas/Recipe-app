import React, { Component } from 'react'
import '../../stylesheets/selectedCategory.css'
import {Link} from "react-router-dom";
import Error from "../error";
import fs from "../../firestoreservice"
import mongo from '../../mongoservice'

class SelectedCategory extends Component {
    constructor() {
        super()
         this.state = {
             selectedCategoryMeals: '',
         }
    }

    async componentWillMount() {
        let category = (this.props && this.props.match && this.props.match.params && this.props.match.params.category) || '';
        if (category){
            let categoryObj = await mongo.getCategoryMeals(category)
            this.setState({selectedCategoryMeals: categoryObj})
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
                             <div className="categoryMealBox" id={mealObj.idMeal} key={i}>
                                 <div className='meal-grid'>
                                     <h1 className="categoryMealName">{mealObj.strMeal}</h1>
                                     <Link to={this.props.match.url + '/' + mealObj.idMeal}>
                                         <img id={'image'+i}
                                         className="categoryMealImg"
                                         alt={mealObj.strMeal} id={mealObj.idMeal}
                                         src={mealObj.strMealThumb}/>
                                     </Link>
                                 </div>
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