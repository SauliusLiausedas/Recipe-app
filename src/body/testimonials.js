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
  render() {
    return (
      <h3>{this.props.text}</h3>
    );
  }
} 

export default Testimonials;


 