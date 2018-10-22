import fs from "../firestoreservice";

export async function getFirebaseCategories() {
    let categories =  await fs.getCollection("categories");
    var data = [];
    categories.forEach( category => data.push(category.data))
    return data;
}

export async function getFbMealsByCategories(category) {
    let meals = await fs.getCollection("recipes");
    console.log(meals);
    return meals.map(meal => meal.data)
        .filter(meal => meal.strCategory.toLowerCase() === category.toLowerCase());
}

export async function getFbMealById(id) {
    let meals = await fs.getCollection("recipes");
    return meals.map(meal => meal.data).find(meal => meal.idMeal === id);
}
