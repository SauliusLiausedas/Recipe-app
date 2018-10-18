import React, { Component } from 'react'
import '../../stylesheets/allCategories.css'
import { Link } from "react-router-dom";
import SelectedCategory from "./selectedCategory";
import SelectedMeal from "./selectedMeal";

class AllCategories extends Component {
    constructor() {
        super()
        this.state = {selected: ''}
    }

    componentWillMount() {
        console.log(this.props)
    }

    render() {
        if(this.props.categories) {
            if(!this.state.selected) {
                return (
                    <div className="allCategories">
                        {this.props.categories.map((categoryObj, i) =>
                            <div onClick={(e) => this.setState({selected: e.target.alt})} key={i}>
                                <h1>{categoryObj.strCategory}</h1>
                                <Link to={'/categories/' + this.state.selected}><img className="allCatImg"
                                                                                     onClick={(e) => this.props.selectCategory(e.target.alt)}
                                                                                     alt={categoryObj.strCategory}
                                                                                     src={categoryObj.strCategoryThumb}/></Link>
                                <p className="categoryDescription">{categoryObj.strCategoryDescription.slice(0, 250) + "..."}</p>
                            </div>
                        )}

                    </div>
                )
            } else {
                return <SelectedCategory selected={this.state.selected}/>
            }
        }
    }
}

export default AllCategories