import React, {Component} from 'react'

class Recipes extends Component {
    kintamasis = '';

    constructor() {
        super()
        this.state = {
            recipes: window.recipeDB
        }

        this.myIndexesToShow = [];
        for (let i = 0; i < 3; i++) {
            let myNewRandomNumber = Math.floor(Math.random() * (this.state.recipes.meal.length - 1));
            let isMyRandomNumberInRandomArray = this.myIndexesToShow.indexOf(myNewRandomNumber) !== -1
            if (isMyRandomNumberInRandomArray) {
                i--;
            } else {
                this.myIndexesToShow.push(myNewRandomNumber);
            }
        }

    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        document.getElementById('kazkoksId');
    }

    test() {
        console.log(this.kintamasis);
    }

    componentWillMount() {
        console.log(this.kintamasis);
    }


    getRandomObjects() {
        return this.state.recipes.meal.filter((mealObj, index) => {
                let myRandomNr = Math.floor(Math.random() * this.state.recipes.meal.length);
                console.log(this.myIndexesToShow);
                return this.myIndexesToShow.indexOf(index) !== -1
            }
        )
    }

    getRender(mealObj) {
        return (<div className="contentRecipe">
            <img className="contentRecipePic" alt="recipePic" src={mealObj.image}/>
            <div>
                <h2 className="contentRecipeTextTitle">{mealObj.name}</h2>
                <ul>
                    {mealObj.ingredients.map(item => <li>{item}</li>)}
                </ul>
                <p>{mealObj.method.slice(0, 250) + "..."}</p>
            </div>
        </div>)
    }

    render() {
        return (
            <div >
                {(() => {
                    return this.getRandomObjects().map(mealObj => this.getRender(mealObj))
                })()}
            </div>
        )
    }
}

export default Recipes;