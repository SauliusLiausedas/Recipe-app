import React, {Component} from 'react';
import './stylesheets/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Slideshow from './body/slideshow.js'
import Header from './body/header.js'
import AllRecipes from './pages/all/allrecipes.js'
import Search from './pages/search/Search.js'
import HomePage from './pages/homepage.js'
import Error from './pages/error.js'
import Add from "./body/add.js"

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" component={ Slideshow } exact/>
                            <Route path="/all" component={ AllRecipes } />
                            <Route path="/home" component={ HomePage } />
                            <Route path="/search" component={ Search } />
                            <Route path="/add" component={ Add } />
                            <Route component={ Error } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
