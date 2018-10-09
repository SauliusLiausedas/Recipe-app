import React, {Component} from 'react'

class Recipes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recipes: window.recipeDB,
            antraste: 'Labadiena'
        }

        this.myIndexesToShow = [];
        let randomNumber = Math.floor(Math.random() * 9);
        for (let i = 0; i < randomNumber; i++) {
            let myNewRandomNumber = Math.floor(Math.random() * (this.state.recipes.meal.length - 1));
            let isMyRandomNumberInRandomArray = this.myIndexesToShow.indexOf(myNewRandomNumber) !== -1;
            if (isMyRandomNumberInRandomArray) {
                i--;
            } else {
                this.myIndexesToShow.push(myNewRandomNumber);
            }
        }

        this.getRandomObjects = this.getRandomObjects.bind(this);
        this.getRender = this.getRender.bind(this);
//        this.showNewRender = this.showNewRender.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        document.getElementById('kazkoksId');
    }

//    componentWillMount() {
//        this.setState({
//            recipes: this.getRandomObjects()
//        })
//    }
        
    getRandomObjects() {
        return this.state.recipes.meal.filter((mealObj, index) => {
                return this.myIndexesToShow.indexOf(index) !== -1
            }
        )
    }

    getRender(mealObj, i) {
        return (
            <div key={i} className="contentRecipe">
            <img className="contentRecipePic" alt={mealObj.name} src={mealObj.image}/>
            <div>
                <h2 className="contentRecipeTextTitle">{mealObj.name}</h2>
                <ul>
                    {mealObj.ingredients.map((item,i) => <li key={i}>{item}</li>)}
                </ul>
                <p>{mealObj.method.slice(0, 250) + "..."}</p>
            </div>
        </div>)
    }

    handleClick() {

        // this.setState({
        //     recipes: this.getRandomObjects().map((mealObj, i) => this.getRender(mealObj, i))
        // })

        console.log('veikia')
        this.setState({antraste: 'Visogero'})
    }

    showNewRender(){
        return this.getRandomObjects().map((mealObj, i) => this.getRender(mealObj, i))
    }

    render() {
        return (
            <div>
                {(() => {
                    return this.getRandomObjects().map((mealObj, i) => this.getRender(mealObj, i))
                })()}
                <button onClick={this.handleClick}>
                    Recipes: {this.myIndexesToShow.length}
                </button>
                <button onClick={this.handleClick()}>
                    Recipes: {this.myIndexesToShow.length}
                </button>
                <h1>{this.state.antraste}</h1>
                <div></div>
                    {this.showNewRender()}
            </div>
        )
    }
}

export default Recipes;