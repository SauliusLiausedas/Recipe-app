import React, {Component} from 'react'
import '../stylesheets/testimonials.css'
import recipeDB from '../data.js'

class Testimonials extends Component {

  state = { id: 0 }

  componentDidMount() {
    setInterval(() => {
      let newState = this.state.id + 1

      if (recipeDB.testimonialsData.length <= newState) {
        this.setState({id: 0})
      } else {
        this.setState({id: this.state.id + 1})
      }
    }, 5000)
  }

  render() {
    const {id} = this.state
    const text = recipeDB.testimonialsData[id]

    return (
        <h3>{text}</h3>
    )
  }
}

export default Testimonials;