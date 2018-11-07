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

   static getSearchValue (searchValue) {
        //TODO get all recipes from mongodb with fetch
        return fetch(`http://localhost:2000/searchrecipe/${searchValue}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }
}