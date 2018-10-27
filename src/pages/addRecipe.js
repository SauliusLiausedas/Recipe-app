import React, { Component } from 'react'
import fs from '../firestoreservice'

class AddRecipe extends Component {
    constructor() {
        super()
        this.url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'
        this.recipeToAdd = {
                dateModified: Date.now(),
                id: '',
                keyWords: '',
                strCategory: '',
                strInstructions: '',
                strMeal: '',
                strMealThumb: this.url,
        }
        this.state = {
            categories: [],
            imageURL: "https://png.icons8.com/small/1600/add-camera.png",
            ingredients: ['Add ingredient', 'Add ingredient', 'Add ingredient'],
            measures: ['Add measure unit', 'Add measure unit', 'Add measure unit'],
        }
    }

    componentWillMount() {
        const categoryNames = []
        fs.getCollectionFull('categories').then(category => {
            this.setState({categories: category})
        })
    }

    goBack() {
        window.history.back()
    }

    getCategoryOptions() {
        return (
            <select id="recipeCategory" onChange={(e) => this.handleChange(e)} className="selectField">
                <option>Select Category</option>
                {this.state.categories.map((category,i) => {
                    return (<option key={i} value={category.strCategory}>{category.strCategory}</option>)
                })
                }
            </select>
        )
    }

    addFields(add) {
        if(add) {
            this.state.ingredients.push('Add ingredient')
            this.state.measures.push('Add measure unit')
        } else {
            this.state.ingredients.pop()
            this.state.measures.pop()
        }
        this.repaint()
    }

    repaint() {
        this.setState({})
    }

    handleChange(e) {
        switch(e.target.id) {
            case 'recipeName':
                this.recipeToAdd.strMeal = e.target.value
                break
            case 'recipeCategory':
                this.recipeToAdd.strCategory = e.target.value
                break
            case 'recipeImage':
                const value = e.target.value
                this.checkImageURL(value)
                    .then(image => {
                        this.setState({imageURL: image})
                        this.recipeToAdd.strMealThumb = image
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                break
            case 'recipeInstructions':
                this.recipeToAdd.strInstructions = e.target.value
                break;
            case 'ingredient':
                this.recipeToAdd[e.target.name] = e.target.value
                break;
            case 'measure':
                this.recipeToAdd[e.target.name] = e.target.value
                break;
            default:
                console.log(e.target.name)
        }
    }

    checkImageURL(url) {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.onerror = function () {
                reject("error");
            };
            img.onload = function () {
                resolve(url);
            };
            img.src = url;
        });
    }

    saveRecipe() {
        let makeSure = this.checkIfEmpty()
        if(makeSure) {
            this.recipeToAdd.keyWords = this.recipeToAdd.strMeal.toLowerCase().split(' ')
            fs.getCount().then(count => {
                let recipeCount = count.count
                this.recipeToAdd.id = recipeCount
                fs.createRecipe(this.recipeToAdd)
                let data = {count: count.count+1}
                fs.updateRecipeCounter(data)
                window.location.replace('/categories/'+this.recipeToAdd.strCategory+'/'+this.recipeToAdd.id)
            })
        }

    }

    checkIfEmpty() {
        if(!this.recipeToAdd.strMeal) {
            this.showAlert("You forgot to fill in recipe name", 'forbid' )
            return false
        }  else if (!this.recipeToAdd.strInstructions) {
            this.showAlert("You must put in instructions for the recipe", 'forbid')
            return false
        } else if (!this.recipeToAdd.strIngredient1) {
            this.showAlert("Recipe must have at least 1 ingredient", 'forbid')
            return false
        } else if (!this.recipeToAdd.strCategory) {
            this.showAlert("You have to choose a category", 'forbid')
            return false
        } else if (this.recipeToAdd.strMealThumb === this.url) {
            return(this.showAlert("Are you sure You want to save recipe without a photo?", 'warn'))
        } else {
            return true
        }
    }

    showAlert(message, type) {
        if(type === 'forbid') {
            alert(message)
        } else {
            let makeSure = window.confirm(message)
            return makeSure
        }
    }

    render() {
        return(
            <div className="viewMeal">
                <div>
                    <div className="mealViewGrid">
                        <div>
                            <h2 className="ingredients">Ingredients</h2>
                            <ul className={'ingredientss-ul'}>
                                {this.state.ingredients.map((ingredient, i) => { return(
                                    <li className={"ingredientsList editIngredients"} key={i}>
                                        <input id={'measure'} name={"strMesure"+(i+1)} onChange={(e) => this.handleChange(e)} className={"ingredients"} placeholder={this.state.measures[i]}/>
                                        <input id={'ingredient'} name={"strIngredient"+(i+1)} onChange={(e) => this.handleChange(e)} className={"ingredients"} placeholder={ingredient}/>
                                        <button className="edit btn addIngredientButton removeIngredientButton" onClick={() => this.addFields(false)}>-</button>
                                    </li>
                                )})}
                                <button className="edit btn addIngredientButton" onClick={() => this.addFields(true)}>+</button>
                            </ul>
                        </div>
                        <div>
                            <input className="ingredients addInputWidth" id="recipeName" onChange={(e) => this.handleChange(e)} placeholder="Recipe Name" />
                            <img alt="Add Picture" className="mealImage" src={this.state.imageURL} />
                            <input type="url"
                                   onChange={(e) => this.handleChange(e)}
                                   id="recipeImage"
                                   className="ingredients addInputWidth"
                                   placeholder="Add image URL" />
                                {this.getCategoryOptions()}
                            <div>
                                <button className="edit btn" onClick={() => this.goBack()}>Cancel</button>
                                <button className="edit btn" onClick={() => this.saveRecipe()}>Save</button>
                            </div>
                        </div>
                        <div>
                            <h2 className="ingredients">Instructions</h2>
                            <textarea id="recipeInstructions" onChange={(e) => this.handleChange(e)} className="instructions" rows="25" cols="50" placeholder="Instructions for your meal"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRecipe