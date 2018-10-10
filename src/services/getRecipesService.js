export function getDB () {
    console.log('getDB');
    return new Promise (resolve=>{
        setTimeout(function(){
            resolve(window.recipeDB)
        }, 100*Math.random())
    });
}

// returns a meal, which is apparently not an object, thus it is
// a copy of the meal, not a reference to the orginal one and
// by changing the copy the original won't change
// so use this ONLY FOR READING, use getDB() for writing
export function getRecipeById (id) {
    console.log('getRecipeById');
    return new Promise (resolve=>{
        setTimeout(function(){
            resolve(window.recipeDB.meal.filter(meal => {meal.id === id}));
        }, 100*Math.random())

    });

}

