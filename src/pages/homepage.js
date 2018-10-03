import React, { Component } from 'react'
import '../stylesheets/homepage.css'
import Testimonials from '../body/testimonials.js';
import Recipes from '../body/recipes.js';
import recipeDB from '../data.js'

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            someText: this.getRandomTestimonial()
        };
        setInterval(()=>{
            this.setState({someText: this.getRandomTestimonial() });
        }, 3000)
    }

 /*   componentWillMount () {
        this.setState({someText: this.getRandomTestimonial() });
    }
*/
    getRandomTestimonial = () => {
        return recipeDB.testimonialsData[Math.floor(Math.random() * recipeDB.testimonialsData.length)]
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