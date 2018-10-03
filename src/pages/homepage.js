import React, { Component } from 'react'
import '../stylesheets/homepage.css'
import Testimonials from '../body/testimonials.js';
import Recipes from '../body/recipes.js';

class HomePage extends Component {
    state = {someTxt: "test"}
    constructor() {
        super()

        setInterval(()=> {
            this.setState({someTxt: Math.random()})
        }, 3000)
    }
    render() {
        return (
            <div className="content">
                <Recipes />
                <div className="testimonials">
                    <h2 className="testimonialsText">Testimonials:</h2>
                    <Testimonials txt={this.state.someTxt}/>
                </div>
            </div>
        )
    }
}

export default HomePage;