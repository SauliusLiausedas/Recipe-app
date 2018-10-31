import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreservice'
import {getRandomRecipes, getCategories, getByCategory, getById} from "./api/getRecipesApi";

class AddToMongodb extends Component {
    constructor() {
        super()
        this.state = {categories: ''}
}
    addToMongodb () {
        getRandomRecipes(1).then((data)=>{
            //fs.createNewRecipe(data.meal[0]);
            console.log(data);
            //TODO post new data to mongodb

            /*fetch('http://loclahost:2000/insertfrommealdb', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }).then(response => response.json());*/

            console.log(fetch('http://localhost:2000/insertfrommealdb', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({a: 1, b: 'Textual content'})
            }).then(response => response.json()));

        });

        // fs.getCollection('recipes').then((data)=>{
        //    console.log(data);
        // });
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

    addCategoriesToFirebase() {
        getCategories().then(categories => {
            categories.categories.map(category => {
                    return fs.createNewCategory(category, category.strCategory)
                })
        })
    }



    render() {
        return (
            <div className="App">
                <button  onClick={() => this.addToMongodb()}>Add to mongodb from mealDB</button>
                <button disabled onClick={this.addCategoriesToFirebase}>Add Categories to Firebase </button>
                <button disabled onClick={this.addRecipesFromCategories}>Add Recipes From Categories to Firebase </button>
                <button disabled onClick={this.addKeyWordsToFirebase}>Add Recipes From Categories to Firebase </button>
            </div>
        );
    }
}

export default AddToMongodb;
