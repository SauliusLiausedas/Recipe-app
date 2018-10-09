import React, {Component} from 'react';
import './stylesheets/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './body/header.js'
import AllRecipes from './pages/all/allrecipes.js'
import Search from './pages/search/Search.js'
import HomePage from './pages/homepage.js'
import Error from './pages/error.js'
import setState from './data.js'
import {getAllRecipes, getRecipeById} from './services/getRecipesService'

setState();

getAllRecipes();

getRecipeById();

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            {/*<Route path="/" component={ Homepage } exact/>*/}
                            <Route path="/" component={ HomePage }  exact/>
                            <Route path="/all" component={ AllRecipes } />
                            <Route path="/search" component={ Search } />
                            <Route component={ Error } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
