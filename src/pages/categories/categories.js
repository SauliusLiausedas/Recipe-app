import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import AllCategories from './allCategories.js'
import SelectedCategory from './selectedCategory.js'
import { getCategories } from '../../api/getRecipesApi.js'
import {Route} from "react-router-dom";


class Categories extends Component {
    constructor() {
        super()
        this.state = {
            categories: "",
            selected: ""
        }
    }

    componentWillMount() {
        getCategories().then(categories => {
            this.setState({categories: categories.categories})
        })
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if (nextProps.match && nextProps.match.params  && nextProps.match.params.category){
            this.setState({selected: nextProps.match.params.category});
        } else {
            this.resetComponent();
        }
    }

    resetComponent() {
        this.setState({
            selected: ""
        });
    }

    render() {
        if(this.state.categories) {
            if(this.state.selected) {
                return (
                    <div className="categories">
                        <SelectedCategory selected={this.state.selected}/>
                    </div>
                )
            } else {
                return(
                    <div className="categories">
                        <AllCategories selectCategory={selected => this.setState({selected: selected})} categories={this.state.categories}/>
                    </div>
                )
            }
        } else {
            return(
                <div className="categories">
                    <h1> Categories of meals</h1>
                </div>
            )
        }
    }
}

export default Categories