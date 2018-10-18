import React, { Component } from 'react'
import { getByCategory } from '../../api/getRecipesApi.js'
import '../../stylesheets/selectedCategory.css'
import SelectedMeal from './selectedMeal.js'
import {Link} from "react-router-dom";

class SelectedCategory extends Component {
    constructor() {
        super()
         this.state = {
                selectedCategoryMeals: '',
             selectedMealId: ""
         }
    }

    componentWillMount() {
        let category = this.props && this.props.match && this.props.match.params && this.props.match.params.category || '';
        if (category){
            getByCategory(category).then(categories => {
                this.setState({selectedCategoryMeals: categories.meals})
            })
        } else {
            //TODO implement error handling or something to show
        }
    }

    changeURL() {
        console.log(this.props.match)
    }

    render() {
         if (this.state.selectedCategoryMeals) {
             if (!this.state.selectedMealId){
                 return (
                     <div className="categoryMeals">
                         {this.state.selectedCategoryMeals.map((mealObj, i) => {
                             return (
                                 <div className="categoryMealBox" id={mealObj.idMeal} key={i}>
                                     {console.log(this.props.match)}
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
            return (
                 <div>
                     {this.changeURL()}
                     Loading...
                 </div>
             )
        }
    }
}

export default SelectedCategory