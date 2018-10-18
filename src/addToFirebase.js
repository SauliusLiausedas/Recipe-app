import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreservice'
import { getRandomRecipes, getCategories } from "./api/getRecipesApi";

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
            </div>
        );
    }
}

export default AddToFirebase;