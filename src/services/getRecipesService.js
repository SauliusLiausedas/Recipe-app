export function getAllRecipes () {
    //TODO implement
    console.log('getAllRecipes');
    return new Promise (resolve=>{
        setTimeout(function(){
            resolve(window.recipeDB)
        }, 100*Math.random())
    });
}

export function getRecipeById (id) {
    //TODO implement
    console.log('getRecipeById');
    return '';
}

