import React, { Component } from 'react'
import '../../stylesheets/allCategories.css'

class AllCategories extends Component {

    render() {
        return(
            <div className="allCategories">
                {this.props.categories.map((categoryObj, i)=>
                    <div key={i}>
                        <h1>{categoryObj.strCategory}</h1>
                        <img className="allCatImg" onClick={(e)=>this.props.selectCategory(e.target.alt)} alt={categoryObj.strCategory} src={categoryObj.strCategoryThumb} />
                        <p className="categoryDescription">{categoryObj.strCategoryDescription.slice(0, 250) + "..."}</p>
                    </div>
                )}

            </div>
        )
    }
}

export default AllCategories