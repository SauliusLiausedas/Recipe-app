import React, { Component } from 'react'
import '../stylesheets/slide.css'
import Popup from './popup.js'
import imgPizza from '../img/pizza.jpg'
import imgChilli from '../img/chilli.jpg'
import imgChickenCas from '../img/chickenCas.jpg'
import imgChickenBom from '../img/bombayChicken.jpg'

const recipeDB = {
    meal: [
        {
        name: "Pizza Dough",
        ingredients: [
            "1/2 cups (355 ml) warm water",
            "package (2 1/4 teaspoons) of active dry yeast",
            "3/4 cups (490 g) bread flour",
            "2 Tbsp olive oil (omit if cooking pizza in a wood-fired pizza oven)",
            "1 teaspoons salt",
            "1 teaspoon sugar"
        ],
        method: "1 Proof the yeast: Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved. 2 Make and knead the pizza dough: Using the mixing paddle attachment, mix in the flour, salt, sugar, and olive oil on low speed for a minute. Then replace the mixing paddle with the dough hook attachment.",
        image: imgPizza
        },
        {
        name: "Chicken Casserole",
        ingredients: [
            "knob of butter",
            "1/2 tbsp rapeseed or olive oil",
            "1 ½ tbsp flour",
            "650g boneless, skinless chicken",
            "3 garlic cloves, crushed",
            "400g baby new potatoes",
            "2 sticks celery",
            "2 carrots",
            "250g mushrooms, quartered"
        ],
        method: "Heat a knob of butter and ½ tbsp rapeseed or olive oil in a large frying pan, cook 1 finely chopped large onion for 8-10 mins until softened and starting to caramelise. Meanwhile, put 1 ½ tbsp flour and a little salt and pepper in a bowl and toss 650g boneless, skinless chicken thigh fillets in it.",
        image: imgChickenCas
    },
    {  name: "Bombay Chicken",
        ingredients: [
            "1 small whole chicken",
            "5 tbsp tikka masala paste",
            "1 tbsp sunflower oil",
            "1 large red onion, halved and sliced",
            "2 large tomatoes, halved and chopped",
            "1 tbsp fenugreek seeds",
            "1 thumb-sized piece ginger"
        ],
        method: "Heat oven to 220C/200C fan/gas 6. Put the chicken on a chopping board and, using your hands, rub the skin generously with half the spice paste. Season well, tie the legs together and set aside. Heat the oil in a large flameproof casserole dish over a medium heat. Add the onion and a good pinch of salt and cook for 5 mins or until beginning to soften. Add the tomatoes, fenugreek seeds, ginger and remaining spice paste, and cook for 3 mins more. Stir through the coconut milk and bring to a simmer. Add the chicken and the potatoes to the dish, and cook in the oven for 20 mins, uncovered.",
        image: imgChickenBom
    },
    {  name: "Chilli",
        ingredients: [
            "1 tbsp rapeseed oil",
            "1 large onion",
            "2 garlic cloves, crushed",
            "2 tsp ground cumin",
            "1 ½ tsp sweet smoked paprika",
            "1 tsp mild chilli"
        ],
        method: "Heat the oil in a heavy-based pan. Cook the onion for 10 mins until softened and starting to caramelise. Add the garlic and spices and cook for a further 1-2 mins. Transfer to a slow cooker, along with the diced vegetables, mince, chopped tomatoes, stock cube and tomato purée. Stir well. Cook on low for 6-7 hours. About half an hour before serving, take off the lid and use a stick blender to blend in the vegetables (if your children aren’t keen to eat veg) or leave chunky. Stir through the lentils and flageolet beans.",
        image: imgChilli
    }]
}

class Slide extends Component {

    constructor() {
        super()
        this.ingredientsList = React.createRef()
        this.state = {
            slideRecipe: 0,
            recipies: recipeDB,
            full: "recipeSlide",
            appear: "appear",
            visibility: false
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.changeSlide()
        }, 5000);
    }

    changeSlide() {
        if(this.state.slideRecipe < 3) {
            this.setState({slideRecipe: this.state.slideRecipe + 1})
        } else {
            this.setState({slideRecipe: 0})
        }

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    showFullText() {
        if(this.state.full === "recipeSlide") {
            this.setState({full: "recipeSlide full"})
        } else {
            this.setState({full: "recipeSlide"})
        }
    }

    editIngredients(e) {
        this.setState({visibility: true})
        clearInterval(this.interval)

    }

    render() {
        return(
            <div className={this.state.full + ' ' + this.state.appear}>
                <Popup value={this.ingredientsList.current} visible={this.state.visibility}/>
                <div className="recipeFrame" >
                    <h1> {this.state.recipies.meal[this.state.slideRecipe].name} </h1>
                    <img ref={this.animatedTextRef} alt={this.state.recipies.meal[this.state.slideRecipe].name} src={this.state.recipies.meal[this.state.slideRecipe].image} className="recipeImg"></img>
                    <ul  ref={this.ingredientsList} className="recipeIngredients">
                        {this.state.recipies.meal[this.state.slideRecipe].ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
                    </ul>
                    <div className="text">
                        <p className="recipeMethod"><a href="#!" onClick={()=> this.showFullText()}> {this.state.recipies.meal[this.state.slideRecipe].method}</a></p>
                    </div>
                    <button className="editBtn" onClick={(e) => this.editIngredients(e)}>Edit Ingredients</button>
                </div>
            </div>
        );
    }
}

export default Slide;