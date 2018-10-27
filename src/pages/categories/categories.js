import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import AllCategories from './allCategories.js'
import fs from '../../firestoreservice'

class Categories extends Component {
    constructor() {
        super()
        this.state = {
            categories: "",
            selected: ""
        }
    }

    componentDidMount() {
        fs.getCollectionFull('categories').then(category => {
            this.setState({categories: category})
        })
    }

    componentWillReceiveProps() {
        this.resetComponent();
    }

    resetComponent() {
        this.setState({
            selected: ""
        });
    }

    render() {
        if(this.state.categories) {
            return(
                <div className="categories">
                    <AllCategories selectCategory={selected => this.setState({selected: selected})} categories={this.state.categories}/>
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

export default Categories