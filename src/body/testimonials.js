import React, {Component} from 'react'
import '../stylesheets/testimonials.css'

const testimonialsData = [
  '"Lorem ipsum dolor sit amet, ad eligendi pariatur. Porro!"',
  '"Sapiente, magnam sunt quidem ex aspernatur maxime!"',
  '"Lius quas nobis doloribus, eveniet repellat itaque."',
  '"Porro! Lorem ipsum dolor sit amet, ad eligendi pariatur."'
]

class Testimonials extends Component {

  state = { id: 0 }

  componentDidMount() {
    setInterval(() => {
      let newState = this.state.id + 1

      if (testimonialsData.length <= newState) {
        this.setState({id: 0})
      } else {
        this.setState({id: this.state.id + 1})
      }
    }, 5000)
  }

  render() {
    const {id} = this.state
    const text = testimonialsData[id]

    return (
        <h3>{text}</h3>
    )
  }
}

export default Testimonials;