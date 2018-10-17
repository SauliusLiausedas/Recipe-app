import React, { Component } from 'react'
import { getByCategory } from '../../api/getRecipesApi.js'
import '../../stylesheets/selectedCategory.css'
import SelectedMeal from './selectedMeal.js'
import {Link} from "react-router-dom";

class SelectedCategory extends Component {
    constructor(props) {
        super()
         this.state = {
            selectedCategoryMeals: [],
             selectedMealId: ""
         }

         if(props.mealId >= 0){
             this.state['selectedMealId'] = props.mealId;
         }
    }

    componentWillMount() {
        getByCategory(this.props.selected).then(categories => {
            this.setState({selectedCategoryMeals: categories.meals})
        })
    }

    viewMealById(e) {
        this.setState({selectedMealId: e.currentTarget.parentNode.id})
    }

    render() {
        if(this.state.selectedCategoryMeals[0]) {
            if(this.state.selectedMealId) {
                return (
                    <div>
                        <SelectedMeal id={this.state.selectedMealId}/>
                    </div>
                )
            } else {
                return (
                    <div className="categoryMeals">
                        {this.state.selectedCategoryMeals.map((mealObj,i) => {
                            return(
                                <Link to={"/categories/" + this.props.selected.toLowerCase() + "/" + mealObj.idMeal} className="navListItemLink">
                                    <div className="categoryMealBox" id={mealObj.idMeal} key={i}>
                                        <h1 className="categoryMealName">{mealObj.strMeal}</h1>
                                        <img className="categoryMealImg" onClick={(e) => this.viewMealById(e)} alt={mealObj.strMeal} src={mealObj.strMealThumb} />
                                    </div>
                                </Link>
                            )
                        })
                        }
                    </div>
                )
            }
        } else {
            return (
                <div>
                    Loading
                </div>
            )
        }
    }
}

export default SelectedCategory