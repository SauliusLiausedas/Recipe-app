import React, {Component} from 'react'
import '../../stylesheets/allCategories.css'
import {Link} from "react-router-dom";

class AllCategories extends Component {
    constructor() {
        super()
        this.state = {selected: ''}
    }

    render() {
        if (this.props.categories) {
            if (!this.state.selected) {
                return (
                    <div className="allCategories">
                        {this.props.categories.map((categoryObj, i) =>
                            <div key={i}>
                                <h1>{categoryObj.strCategory}</h1>
                                <Link to={'/categories/' + categoryObj.strCategory}>
                                    <img className="allCatImg"
                                         alt={categoryObj.strCategory}
                                         src={categoryObj.strCategoryThumb}/>
                                </Link>
                                <p className="categoryDescription">{categoryObj.strCategoryDescription.slice(0, 250) + "..."}</p>
                            </div>
                        )}
                    </div>
                )
            }
        }
    }
}

export default AllCategories