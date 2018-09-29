import React, {Component} from 'react';
import '../stylesheets/slideshow.css'
import Slide from './slide.js'

class Slideshow extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }

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