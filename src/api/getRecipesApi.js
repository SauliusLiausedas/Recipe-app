import setState from '../data.js'
const RANDOM_RECIPES_GEN = 'https://www.themealdb.com/api/json/v1/1/random.php';
const LATEST_RECIPES_GEN = 'https://www.themealdb.com/api/json/v1/1/latest.php';
const SEARCH_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
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

//TODO Search meal by name from https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

function getDataPromise() {
    return fetch(RANDOM_RECIPES_GEN)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
        return data;
    });
}

export function searchByName (name){
    return fetch(SEARCH_BY_NAME+name)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
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
    //TODO implement
    // console.log('getRecipeById');
    return new Promise (resolve=> {
        setTimeout(function(){
            resolve(window.recipeDB.meal[id])
        }, 100*Math.random())
    })
}

