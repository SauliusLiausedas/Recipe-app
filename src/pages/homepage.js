import React, { Component } from 'react'
import placeholder from '../img/placeholder.png';
import '../stylesheets/homepage.css'
import Testimonials from '../body/testimonials.js';

class HomePage extends Component {
    render() {
        return (
            <div className="content">
                <div className="contentRecipe">
                    <img src={placeholder} className="contentRecipePic" alt="recipePic"/>
                    <div className="contentRecipeText">
                        <h2 className="contentRecipeTextTitle">Hot & Spicy Wings</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className="contentRecipe">
                    <img src={placeholder} className="contentRecipePic" alt="recipePic"/>
                    <div className="contentRecipeText">
                        <h2 className="contentRecipeTextTitle">Hot & Spicy Wings</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className="contentRecipe">
                    <img src={placeholder} className="contentRecipePic" alt="recipePic"/>
                    <div className="contentRecipeText">
                        <h2 className="contentRecipeTextTitle">Hot & Spicy Wings</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                     </div>         
                </div>
                <div className="testimonials">
                    <h2>Testimonials:</h2>
                    <Testimonials />
                </div>
            </div>
        )
    }
}

export default HomePage;