/*
* References
* https://firebase.google.com/docs/web/setup?authuser=0
* https://firebase.google.com/docs/firestore/quickstart?authuser=0
* https://firebase.google.com/docs/firestore/query-data/get-data
* */
export default class {
    static getAllRecipes (itemsPerPage, page) {
        //TODO get all recipes from mongodb with fetch
         return fetch(`http://localhost:2000/getallrecipes/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
            return data;
         }))})
    }

    static getRecipesCount () {
        //TODO get all recipes from mongodb with fetch
        return fetch(`http://localhost:2000/getrecipescount/`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static getRecipesCount (searchValue) {
        //TODO get all recipes from mongodb with fetch
        return fetch(`http://localhost:2000/searchrecipe/${searchValue}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }
}