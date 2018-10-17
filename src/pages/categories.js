import React, { Component } from 'react'
import '../stylesheets/categories.css'
import AllCategories from './allcategories.js'
import { getCategories } from '../api/getRecipesApi.js'

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categoriesList: [],
            selectedCategory: ''
        };
    }

componentWillMount() {
    getCategories().then(data => {
        this.setState({categoriesList: data.categories})
    })
}    

componentWillReceiveProps() {
    this.resetComponent();
}

resetComponent() {
    this.setState({
        selectedCategory: ''
    })
}

render() {
    if (this.state.categoriesList) {
        return(
            <div>
                <AllCategories selectCategory={selectedCategory => this.setState({selectedCategory: selectedCategory})} categories={this.state.categoriesList} />
            </div>
        )
    } else {
        return(
            <div>
                <h1>Nieko</h1>
            </div>
        )
    }
}

}

export default Categories;
