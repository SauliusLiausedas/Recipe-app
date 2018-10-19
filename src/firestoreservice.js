/*
* References
* https://firebase.google.com/docs/web/setup?authuser=0
* https://firebase.google.com/docs/firestore/quickstart?authuser=0
* https://firebase.google.com/docs/firestore/query-data/get-data
* */
export default class {
    static db;

    static init() {
        this.db = window.firebase.firestore();
        this.db.settings({timestampsInSnapshots: true});
    }

    /*
    * This should return all recipes
    * */
    static getCollection(collection) {
        return new Promise(resolve => {
            this.db.collection(collection).get().then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({data: doc.data(), id: doc.id});
                });
                resolve(data);
            });
        });
    }

    static updateRecipe() {

    }

    /*
    * Create new recipes
    * @param data object which contains all recipe data
    * */
    static createNewRecipe(data) {
        return new Promise(resolve => {
            this.db.collection("recipes").doc(data.idMeal).set(data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", data.idMeal);
                    resolve(docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }

    //Method To add Recipes to DB
    static createRecipesFromCategories(data, mealId) {
        return new Promise(resolve => {
            this.db.collection("recipes").doc(mealId).set(data)
                .then(function (docRef) {
                    console.log("Document written with Name: ", mealId);
                    resolve(docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }

    //Method to add Categories to DB
    static createNewCategory(data, mealId) {
        return new Promise(resolve => {
            this.db.collection("categories").doc(mealId).set(data)
                .then(function (docRef) {
                    console.log("Document written with Name: ", mealId);
                    resolve(docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }
}