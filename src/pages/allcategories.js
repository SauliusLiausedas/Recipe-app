import React, { Component } from 'react'
import '../stylesheets/categories.css'
import { Link } from 'react-router-dom'
import SelectedCategory from './selectedcategory.js'
import SelectedMeal from './selectedmeal.js'


class AllCategories extends Component {
    constructor() {
        super()
        this.state = {selectedCategory: ''}
    }

    render() {
        if (this.props.categories) {
            if (!this.state.selectedCategory) {
                return (
                    <div className="categoryBox">
                        {this.props.categories.map((categoryObj, i) =>
                            <div onClick={(e)=>this.setState({selectedCategory: e.target.alt})} key={i}>
                                <h2 className="categoryTitle">{categoryObj.strCategory}</h2>
                                <Link to={'/categories/' + this.state.selectedCategory}>
                                    <img className="categoryPic" 
                                        onClick={(e) => this.props.selectCategory(e.target.alt)}
                                        alt={categoryObj.strCategory} 
                                        src={categoryObj.strCategoryThumb}/>
                                </Link>
                            </div>
                        )}
                    </div>
                )
            } else {
                return <SelectedCategory selectedCategory={this.state.selectedCategory} />
            }
        } else {
            return <SelectedMeal />
        }
    }
}

export default AllCategories;

   