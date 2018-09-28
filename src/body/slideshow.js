import React, {Component} from 'react';
import FadeIn from 'react-fade-in'
import '../stylesheets/slideshow.css'
import Slide from './slide.js'

class Slideshow extends Component {


    render() {
        return (
            <div>
                <div className="slideWindow">
                    <Slide/>
                </div>
            </div>
        );
    }
}

export default Slideshow;