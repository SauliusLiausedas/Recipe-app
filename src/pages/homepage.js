import React, { Component } from 'react'
import '../stylesheets/homepage.css'
import Testimonials from '../body/testimonials.js';
import Recipes from '../body/recipes.js';
import {getDB} from "../services/getRecipesService";

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            someText: ""
        };

        this.setRandomTestimonial();

        setInterval(()=>{
            this.setRandomTestimonial();
        }, 3000)
    }

 /*   componentWillMount () {
        this.setState({someText: this.getRandomTestimonial() });
    }
*/
    setRandomTestimonial (){
        getDB().then(db =>{
            this.setState({someText : db.testimonialsData[Math.floor(Math.random() * window.recipeDB.testimonialsData.length)]});
        });
    }

    render() {
        return (
            <div className="content">
                <Recipes />
                <div className="testimonials">
                    <h2 className="testimonialsText">Testimonials:</h2>
                    <Testimonials text={this.state.someText} />
                </div>
            </div>
        )
    }
}

export default HomePage;