import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import AllCategories from './allcategories.js'
import { getCategories } from '../../api/getRecipesApi.js'

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: "",
            selected: ""
        };
    }

componentWillMount() {
    getCategories().then(categories => {
        this.setState({categories: categories.categories})
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
    if (this.state.categories) {
        return(
            <div>
                <AllCategories categories={this.state.categories} />
            </div>
        )
    } else {
        return(
            <div>
                <h1>Error</h1>
            </div>
        )
    }
}

}

export default Categories;
