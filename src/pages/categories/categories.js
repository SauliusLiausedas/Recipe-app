import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import AllCategories from './allCategories.js'
import SelectedCategory from './selectedCategory.js'
import { getCategories } from '../../api/getRecipesApi.js'
import {Route} from "react-router-dom";
import {getFirebaseCategories} from "../../api/firebaseApi";


class Categories extends Component {
    constructor(props) {
        super()
        this.state = {
            categories: "",
            selected: ""
        }

        if(props.match.params.id) this.mealId= props.match.params.id;
        else this. mealId = -1;

        if(props.match.params.category){
         this.state['selected'] = props.match.params.category;
        }
    }

    componentWillMount() {
        getFirebaseCategories().then(categories => {
            this.setState({categories: categories})
        })
    }

    componentWillReceiveProps(nextProps) {
        // debugger;
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
                        <SelectedCategory selected={this.state.selected} mealId={this.mealId}/>
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