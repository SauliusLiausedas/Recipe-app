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
                                         to={'/categories/' + this.props.selected + '/' + this.state.selectedMealId}><img
                                         className="categoryMealImg"
                                         onClick={(e) => this.setState({selectedMealId: e.target.id})}
                                         alt={mealObj.strMeal} id={mealObj.idMeal}
                                         src={mealObj.strMealThumb}/></Link>
                                 </div>
                             )
                         })
                         }
                     </div>
                 )
             } else {
                window.location.pathname = '/categories/'+this.props.selected+'/'+this.state.selectedMealId
                return <SelectedMeal id={this.state.selectedMealId}/>
             }
        } else {
            return <div> neveikia </div>
        }
    }
}

export default SelectedCategory