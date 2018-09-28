import React, {Component} from 'react';
import './stylesheets/App.css';
import Slideshow from './body/slideshow.js'
import Header from './body/header.js'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Slideshow/>
            </div>
        );
    }
}

export default App;
