export default class {
    static getAllRecipes (itemsPerPage, page) {
         return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/getallrecipes/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
            return data;
         }))})
    }

    static getRecipesCount () {
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/getrecipescount/`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

   static getSearchValue (searchValue, itemsPerPage, page) {
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/searchrecipe/${searchValue}/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static getRecipeById (id) {
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/getById/${id}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static createRecipe (recipe) {
        console.log(recipe);
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/insertfrommealdb`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static updateRecipe (recipe) {
        console.log(recipe);
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/updateRecipe`, {
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            })
    }

    static getCategories () {
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/getCategories/`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static getRecipesByCategory (category) {
        return fetch(`recipe-app-mindgsv244709.codeanyapp.com:2000/getRecipesByCategory/${category}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }
}