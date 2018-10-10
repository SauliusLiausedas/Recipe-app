import React from 'react'
import '../stylesheets/testimonials.css'

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
  }


  componentWillMount () {
    this.setState({someText: this.getRandomTestimonial()})
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({someText: this.getRandomTestimonial()});
    }, 3000)
  }

  getRandomTestimonial = () => {
    return window.recipeDB.testimonialsData[Math.floor(Math.random() * window.recipeDB.testimonialsData.length)]
  }

  render() {
    return (
      <h3>{this.getRandomTestimonial()}</h3>
    );
  }
} 

export default Testimonials;


 