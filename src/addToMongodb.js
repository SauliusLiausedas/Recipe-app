import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreservice'
import {getByCategory, getById, getCategories, getRandomRecipes} from "./api/getRecipesApi";
import mongo from './mongoservice'

class AddToMongodb extends Component {
    constructor() {
        super()
        this.state = {categories: ''}
    }

    addToMongodb() {
        getRandomRecipes(1).then((data) => {
            console.log(fetch('http://localhost:2000/insertfrommealdb', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.meal[0])
            }).then(response => response.json()));

        });
    }

    addKeyWordsToFirebase() {
        let allRecipes = []
        let recipeKeyWords = ''
        fs.getAllRecipesFromDB().then(recipes => {
            allRecipes = recipes
            allRecipes.map(data => {
                recipeKeyWords = data.data.strMeal.toLowerCase().split(' ')
                data.data.keyWords = recipeKeyWords
            })
            allRecipes.map(recipe => {
                fs.createRecipe(recipe.data)
            })
        })
    }

    addRecipesFromCategories() {
        getCategories().then(categories => {
            categories.categories.map(category => {
                return getByCategory(category.strCategory).then(recipes => {
                    recipes.meals.map(meal => {
                        return getById(meal.idMeal).then(meal => {
                            fs.createRecipesFromCategories(meal.meals[0], meal.meals[0].strMeal)
                        })
                    })
                })
            })
        })
    }

    addCategoriesToMongo() {
        getCategories().then(categories => {
            categories.categories.forEach(category => {
                console.log(fetch('http://localhost:2000/insertcategories', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(category)
                }).then(response => response.json()));
            })
        })
    }

    getMongoRecipesLength() {
        mongo.getCount().then(data=> {
            console.log(data)
        })
    }

    render() {
        return (
            <div className="App">
                <button onClick={() => this.addToMongodb()}>Add to mongodb from mealDB</button>
                <button onClick={this.addCategoriesToMongo}>Add Categories to Firebase</button>
                <button onClick={this.getMongoRecipesLength}>Get recipes collection length from mongoDB</button>
                <button disabled onClick={this.addRecipesFromCategories}>Add Recipes From Categories to Firebase</button>
                <button disabled onClick={this.addKeyWordsToFirebase}>Add Recipes From Categories to Firebase</button>
            </div>
        );
    }
}

export default AddToMongodb;
