import React from 'react'
import fs from '../firestoreService.js'

class Testimonials extends React.Component {
  constructor() {
    super()
    this.state = {
        someText: ''
    };
  }


  componentWillMount () {
    this.setState({someText: this.getRandomTestimonial2()})
  }

  componentDidMount(){
    setInterval(()=>{
      this.getRandomTestimonial2();
      this.setState({});
    }, 3000)
  }

  async getRandomTestimonial() {
    let testimonials = await fs.getCollection('testimonials');
    return testimonials[Math.floor(Math.random() * testimonials.length)].data.testimonial;
    }

  getRandomTestimonial2 () {
    fs.getCollection('testimonials').then(testimonials => {
      this.state.someText = testimonials[Math.floor(Math.random() * testimonials.length)].data.testimonial;
    })
  }

  render() {
    return (
      <h3>{this.state.someText}</h3>
    );
  }
} 

export default Testimonials;


 