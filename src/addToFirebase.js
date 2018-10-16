import React, {Component} from 'react';
import './stylesheets/App.css';
import fs from './firestoreservice'
import { getRandomRecipes} from "./api/getRecipesApi";

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

    render() {
        return (
            <div className="App">
                <button onClick={this.addToFirebase}>Add to firebase from mealDB</button>
            </div>
        );
    }
}

export default AddToFirebase;
