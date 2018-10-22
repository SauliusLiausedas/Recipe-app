import React from 'react'
import '../stylesheets/testimonials.css'
import  {getRandomTestimonial} from '../api/firebaseApi.js';
import fs from "../firestoreservice";

/*
class Testimonials extends Component {

  state = { id: 0 }

  componentDidMount() {
    setInterval(() => {
      let newState = this.state.id + 1

      if (window.recipeDB.testimonialsData.length <= newState) {
        this.setState({id: 0})
      } else {
        this.setState({id: this.state.id + 1})
      }
    }, 5000)
  }

  render() {
    const {id} = this.state
    const text = window.recipeDB.testimonialsData[id]

    return (
        <h3>{text}</h3>
    )
  }
}
*/

class Testimonials extends React.Component {
  constructor() {
    super()
    this.state = {
        someText: ''
    };

      debugger;
  }


  componentWillMount () {
    this.setState({someText: this.setRandomTestimonial()})
  }

  componentDidMount(){
    setInterval(()=>{
        this.setRandomTestimonial()
      this.setState({});
    }, 3000)
  }


    setRandomTestimonial () {
        fs.getCollection('testimonials').then(testimonials => {
            this.state.someText =  testimonials[Math.floor(Math.random() *testimonials.length)].data.testimonial;
        })
    }

  render() {
    return (
      <h3>{this.state.someText}</h3>
    );
  }
} 

export default Testimonials;


 