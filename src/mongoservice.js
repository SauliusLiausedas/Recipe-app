/*
* References
* https://firebase.google.com/docs/web/setup?authuser=0
* https://firebase.google.com/docs/firestore/quickstart?authuser=0
* https://firebase.google.com/docs/firestore/query-data/get-data
* */
export default class {
    static getAllRecipes () {
        //TODO get all recipes from mongodb with fetch
         return fetch('http://localhost:2000/getallrecipes/10/1', {
        }).then(response => {
            return response.json().then((data=>{
            return data;
         }))})
    }
}