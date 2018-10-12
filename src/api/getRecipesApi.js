import setState from '../data.js'
const RANDOM_RECIPES_GEN = 'https://www.themealdb.com/api/json/v1/1/random.php';
const LATEST_RECIPES_GEN = 'https://www.themealdb.com/api/json/v1/1/latest.php';
const SEARCH_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const GET_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const GET_CATEGORY_ITEMS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const GET_MEAL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
setState()

/*
* Method to get randomized meals
* */
export function getAllRecipes () {
    return new Promise (resolve=>{
        let dataArray = [];
        for (let i = 0; i < 10; i++){
            dataArray.push(getDataPromise());
        }
        Promise.all(dataArray).then((response)=>{

            resolve({
                meal: response.map(myObj=>{return myObj.meals[0]})
            });
        });
    });
}

// Method to get random number of random recipes

export function getRandomRecipes(random) {
    return new Promise (resolve=>{
        let dataArray = [];
        for (let i = 0; i < random; i++){
            dataArray.push(getDataPromise());
        }
        Promise.all(dataArray).then((response)=>{

            resolve({
                meal: response.map(myObj=>{
                    return(
                        myObj.meals[0]
                    )
                })
            });
        });
    });
}

// Helper function for random recipe generator

function getDataPromise() {
    return fetch(RANDOM_RECIPES_GEN)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
        return data;
    });
}

// Method to get recipes by name in search

export function searchByName (name){
    return fetch(SEARCH_BY_NAME+name)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });
}

// Method to get recipes by categories

export function getByCategory (category){
    return fetch(GET_CATEGORY_ITEMS+category)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });
}

// Method to get Categories

export function getCategories (){
    return fetch(GET_CATEGORIES)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });
}

// Method to get recipes by ID's from categories

export function getById (id){
    return fetch(GET_MEAL_BY_ID+id)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            return (data)
        });
}

/*
* Method to get latest meals
* */
/*export function getAllRecipes () {
    return new Promise (resolve=>{
        fetch(LATEST_RECIPES_GEN)
            .then(function(response) {
                return response.json();
            }).then(function(data) {
            resolve({
                meal: data.meals
            });
        });
    });
}*/



export function getRecipeById (id) {
    return new Promise (resolve=> {
        setTimeout(function(){
            resolve(window.recipeDB.meal[id])
        }, 100*Math.random())
    })
}

