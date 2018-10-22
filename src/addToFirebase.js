import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreService'
import { getRandomRecipes, getCategories, getMealsByCategory, getMealById } from "./api/getRecipesApi";

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
                getMealsByCategory(category.strCategory).then(recipes => {
                    recipes.meals.map(meal => {
                        getMealById(meal.idMeal).then(meal => {
                            fs.createRecipesFromCategories(meal.meals[0], meal.meals[0].strMeal)
                        })
                    })
                })
            })
        })
    }

    addCategoryToFirebase() {
        getCategories().then((data) => {
            data.categories.forEach((category) => fs.createNewCategory(category));
        });
        
        fs.getCollection('categories').then((data)=>{
            console.log(data);
        });
    }

    render() {
        return (
            <div className="App">
                <button onClick={() => this.addToFirebase()}>Add to firebase from mealDB</button>
                <button onClick={this.addCategoryToFirebase}>Add Categories to Firebase </button>
                <button onClick={this.addRecipesFromCategories}>Add Recipes from Categories to Firebase </button>
            </div>
        );
    }
}

export default AddToFirebase;