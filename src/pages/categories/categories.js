import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import AllCategories from './allcategories.js'
import fs from '../../firestoreService.js'
// import { getCategories } from "../../api/getRecipesApi";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.initCategories();
        this.state = {
            categories: "",
            selected: ""
        };
    }

async initCategories() {
    let categories = await fs.getCollection('categories') 
    this.setState({categories: categories})
}

/*
componentWillMount() {
    getCategories().then(data => {
        this.setState({categories: data.categories})
    })
}    
*/
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
                <h1>Loading</h1>
            </div>
        )
    }
}

}

export default Categories;
