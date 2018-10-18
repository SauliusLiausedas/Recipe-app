import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import { Link } from 'react-router-dom'
import SelectedCategory from './selectedcategory.js'
import SelectedMeal from './selectedmeal.js'


class AllCategories extends Component {
    constructor() {
        super()
        this.state = {selected: ''}
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        if (this.props.categories) {
            if (!this.state.selected) {
                return (
                    <div className="categoryBox">
                        {this.props.categories.map((categoryObj, i) =>
                            <div onClick={(e)=>this.setState({selected: e.target.alt})} key={i}>
                                <h2 className="categoryTitle">{categoryObj.strCategory}</h2>
                                <Link to={'/categories/' + this.state.selected}>
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
                if (window.location.pathname.split('/')[3]) {
                    return <SelectedMeal id={window.location.pathname.split('/')[3]} />
                } else {
                    let path = this.props.location.pathname.split('/')[2]
                    return <div><SelectedCategory selected={path} /></div>
                }
            }
        } 
    }
}

export default AllCategories;

   