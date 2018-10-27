import React, {Component} from 'react';
import './stylesheets/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './body/header.js'
import AllRecipes from './pages/all/allrecipes.js'
import Search from './pages/search/Search.js'
import HomePage from './pages/homepage.js'
import Error from './pages/error.js'
import Categories from './pages/categories/categories.js'
import SelectedCategory from "./pages/categories/selectedCategory";
import SelectedMeal from "./pages/categories/selectedMeal";
import AddToFirebase from "./addToFirebase";
import AddRecipe from "./pages/addRecipe"
import fs from "./firestoreservice"

fs.init();

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
                            <Route path="/all/:page" exact component={ AllRecipes } />
                            <Route path="/search" exact component={ Search } />
                            <Route path="/search/:searchWord/:page" exact component={ Search } />
                            <Route path="/categories" exact component={ Categories }/>
                            <Route path="/categories/:category" exact  component={ SelectedCategory } />
                            <Route path="/categories/:category/:id" exact component={ SelectedMeal } />
                            <Route path="/addtofirebase" exact component={ AddToFirebase } />
                            <Route path="/add" exact component={ AddRecipe } />
                            <Route component={ Error } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
