import React, { Component } from 'react'
import '../stylesheets/homepage.css'
import Testimonials from '../body/testimonials.js';
import Recipes from '../body/recipes.js';

class HomePage extends Component {

//    handleClick() {
//        alert('testas');
//    }
 
    render() {
        return (
            <div>
                <div className="content">
                    <Recipes />
                </div>
                <div className="testimonials">
                    <h2 className="testimonialsText">Testimonials:</h2>
                    <Testimonials />
                </div>
            </div>
        )
    }
}

export default HomePage;