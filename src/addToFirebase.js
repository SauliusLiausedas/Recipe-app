import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreservice'
import {getCategories, getRandomRecipes} from "./api/getRecipesApi";

class AddToFirebase extends Component {

    addToFirebase () {
        console.log('add to firebase');
        getRandomRecipes(1).then((data)=>{
            fs.createNewRecipe(data.meal[0]);
        });

        fs.getCollection('recipes').then((data)=>{
           console.log(data);
        });
    }

    async addAllCategoriesToFirebase () {
        debugger;
        let categories = [];
        categories = await getCategories();
        categories.categories.forEach(category => {
            fs.createNewCategory(category);
        })
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.addToFirebase}>Add to firebase from mealDB</button><br/>
                <button onClick={this.addAllCategoriesToFirebase()}>Add categories to firebase from mealDB</button>

            </div>
        );
    }
}

export default AddToFirebase;
