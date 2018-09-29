import React, { Component } from 'react'
import FadeIn from 'react-fade-in';
import '../stylesheets/popup.css'

class Popup extends Component {
    constructor(props) {
        super()
        this.ingredientsToShow = []
        this.ingredientsToShowOn = []
        this.state = {
            visibility: false,
            ingredients: ""
        }
    }

    showList() {
        console.log(this.props.value)
        if(this.props.visible) {
            let howMany = this.props.value.children.length-1
            for (let i=0; i<=howMany; i++) {
                this.ingredientsToShow.push(this.props.value.children[i])
            }

        } else {
            return false
        }
    }

    render() {
        if(this.props.visible === true) {
            return (
                <FadeIn transitionDuration="600">
                <div id="popup">
                    <ul>
                        {/*{this.props.value.children.map((li, i) => <li key={i}>{li}</li>)}*/}
                        {/*{this.props.value.children.map(row => console.log(row))}*/}
                        {this.showList()}
                        {/*{this.ingredientsToShow.map(li => <li>{li}</li>)}*/}
                        {/*{console.log(this.ingredientsToShow[0].innerText)} ---------------*/}
                        {/*{console.log(this.ingredientsToShow)}*/}
                        {this.ingredientsToShow.map((li,i) => <p key={i}>{li.innerText}</p>)}
                    </ul>
                </div>
                </FadeIn>
            );
        } else {
            return false
        }
    }
}

export default Popup;