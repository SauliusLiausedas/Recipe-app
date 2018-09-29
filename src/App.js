import React, {Component} from 'react';
import './stylesheets/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Slideshow from './body/slideshow.js'
import Header from './body/header.js'
import AllRecipes from './pages/all/allrecipes.js'
import Error from './pages/error.js'

const NewRoute = () => {
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

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
                            <Route component={ Error } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
