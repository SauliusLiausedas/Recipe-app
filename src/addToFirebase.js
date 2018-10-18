import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreservice'
import {getRandomRecipes, getCategories, getByCategory, getById} from "./api/getRecipesApi";

class AddToFirebase extends Component {
    constructor() {
        super()
        this.state = {categories: ''}
}
    addToFirebase () {
        console.log('add to firebase');
        getRandomRecipes(1).then((data)=>{
            fs.createNewRecipe(data.meal[0]);
        });

        fs.getCollection('recipes').then((data)=>{
           console.log(data);
        });
    }

    addRecipesFromCategories() {
        getCategories().then(categories => {
            categories.categories.map(category => {
                getByCategory(category.strCategory).then(recipes => {
                    recipes.meals.map(meal => {
                        getById(meal.idMeal).then(meal => {
                            fs.createRecipesFromCategories(meal.meals[0], meal.meals[0].strMeal)
                        })
                    })
                })
            })
        })
    }

    addCategoriesToFirebase() {
        getCategories().then(categories => {
            categories.categories.map(category => {
                    fs.createNewCategory(category, category.strCategory)
                })
        })
    }

    render() {
        return (
            <div className="App">
                <button disabled onClick={() => this.addToFirebase()}>Add to firebase from mealDB</button>
                <button disabled onClick={this.addCategoriesToFirebase}>Add Categories to Firebase </button>
                <button disabled onClick={this.addRecipesFromCategories}>Add Recipes From Categories to Firebase </button>
            </div>
        );
    }
}

export default AddToFirebase;
