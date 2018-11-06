/*
* References
* https://firebase.google.com/docs/web/setup?authuser=0
* https://firebase.google.com/docs/firestore/quickstart?authuser=0
* https://firebase.google.com/docs/firestore/query-data/get-data
* */
export default class {

    // Method to GET all Recipes from MongoDB

    static getAllRecipes() {
        return fetch('http://localhost:2000/getallrecipes', {}).then(response => {
            return response.json().then((data => {
                return data;
            }))
        })
    }

    // Method to get LENGTH of elements in recipes collection

    static getCount() {
        return fetch('http://localhost:2000/getcount', {}).then(response => {
            return response.json().then((data => {
                return data
            }))
        })
    }

    // Method to GET quantity of recipes from recipe collection

    static getPageRecipes(quantity, id) {
        return fetch('http://localhost:2000/getrecipes/'+quantity+'/'+id, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))
        })
    }

}

