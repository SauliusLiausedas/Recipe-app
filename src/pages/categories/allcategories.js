import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import { Link } from 'react-router-dom'

class AllCategories extends Component {
    constructor() {
        super()
        this.state = {selected: ''}
    }

    render() {
        if (this.props.categories) {
            if (!this.state.selected) {
                return (
                    <div>
                        {this.props.categories.map((categoryObj, i) =>
                            <div className="categoryBox" onClick={(e) => this.setState({selected: e.target.alt})} key={i}>
                                <h2 className="categoryTitle">{categoryObj.data.strCategory}</h2>
                                <Link to={'/categories/' + categoryObj.data.strCategory}>
                                    <img className="categoryPic"  
                                        alt={categoryObj.strCategory} 
                                        src={categoryObj.data.strCategoryThumb}/>
                                </Link>
                            </div>
                        )}
                    </div>
                )
            } else {

            }
        } else {
            
        }
    }
     
}

export default AllCategories;

   