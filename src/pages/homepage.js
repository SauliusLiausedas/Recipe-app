import React, { Component } from 'react'
import '../stylesheets/homepage.css'
import Testimonials from '../body/testimonials.js';
import Recipes from '../body/recipes.js';

class HomePage extends Component {
    render() {
        return (
            <div className="content">
                <Recipes />
                <div className="testimonials">
                    <h2 className="testimonialsText">Testimonials:</h2>
                    <Testimonials />
                </div>
            </div>
        )
    }
}

export default HomePage;