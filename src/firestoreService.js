/*
* References
* https://firebase.google.com/docs/web/setup?authuser=0
* https://firebase.google.com/docs/firestore/quickstart?authuser=0
* https://firebase.google.com/docs/firestore/query-data/get-data
* */
export default class {
    static db;
    static lastRecipeDoc;

    static init() {
        this.db = window.firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true});
    }

    // This should return all collection

    static async getCollection(collection) {
        // let collectionLength = await this.getCollectionLength(collection);
        let page1 = await this.getCollectionPage(collection);
        return page1;
    }

    static getCollectionLength (collection) {
        return this.db.collection(collection).get().then((querySnapshot) => {
            console.log(querySnapshot);
            return querySnapshot.docs.length;
        })
    }

    static getCollectionPage(collection, page = 1) {
        let query = null;
        if (page === 1) {
            // example for search query
            // query = this.db.collection(collection).where('keywords', 'array-contains', 'bean').limit(10).get();
            query = this.db.collection(collection).limit(10).get();
        } else if (page > 1) {
            query = this.db.collection(collection).orderBy('strMeal').startAfter(this.lastRecipeDoc.id).limit(10).get()
        }

        return new Promise(resolve => {
            query.then((querySnapshot) => {
                const data = [];
                // const docData = [];
                querySnapshot.forEach((doc) => {
                    data.push({data: doc.data(), id: doc.id});
                    //docData.push({doc: doc});
                });
                console.log(data);
                this.lastRecipeDoc = querySnapshot.docs[querySnapshot.docs.length-1];
                resolve(data);
            });
        });
        
        /*console.log(docData[docData.length-1].doc);
        this.db.collection(collection).startAfter(docData[docData.length-1].doc).limit(10).get().then((querySnapshot) => {
            const data = [];
            const docData = [];
            querySnapshot.forEach((doc) => {
                data.push({data: doc.data(), id: doc.id});
                docData.push({doc: doc});
            });
            console.log(data);
        });*/

    }

    // Method to search recipes by name

    static getRecipesByName(name) {
        return new Promise(resolve => {
            let query = this.db.collection('recipes').where('keywords', 'array-contains', name).limit(10).get();
            query.then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    // if(doc.data().strMeal.toLowerCase().includes(name.toLowerCase()))
                        data.push({data: doc.data(), id: doc.id});
                });
                resolve(data);
            });
        });
    }

//    static getCollection(collection) {
//        return new Promise(resolve => {
//            this.db.collection(collection).get().then((querySnapshot) => {
//                const data = [];
//                querySnapshot.forEach((doc) => {
//                    data.push({data: doc.data(), id: doc.id});
//                });
//                resolve(data);
//            });
//        });
//    }

    static updateRecipe() {
        this.db.collection('recipes').doc('2sMNxhVXyPHNyJ2VtSBs').set({
            }
        )
    }

    static addNewRecipes() {
        this.db.collection('recipes').doc('2sMNxhVXyPHNyJ2VtSBs').update({
            cookingTime: 11111
        })
    }

    static updateRecipe() {
        var recipeRef = this.db.collection('recipes').where('name', '==', 'Sandwich')
        recipeRef.update()
    }

    static getCollectionDoc() {
        return new Promise(resolve => {
            this.db.collection('recipes').doc('kbYRMIVgNBd2RImUk0ON').get().then(data => {
                if(data.exists) {
                    console.log("Document data:", data)
                } else {
                    console.log("No such document")
                }
            }).catch((err) => {
                console.log('Error: ', err)
            })
            resolve('lel')
        })
    }

    static getRecipesByCategory(name) {
        return new Promise(resolve => {
            this.db.collection('recipes').get().then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().strCategory === name) {
                        data.push({data: doc.data(), id: doc.id});
                    }
                });
                resolve(data);
            });
        });
    }

    static getRecipeById(id) {
        return new Promise(resolve => {
            this.db.collection('recipes').get().then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().idMeal === id) {
                        data.push({data: doc.data(), id: doc.id});
                    }
                });
                resolve(data);
            });
        });
    }

    /*
    * Create new recipes
    * @param data object which contains all recipe data
    * */
    static createNewRecipe(data) {
        return new Promise(resolve => {
            this.db.collection("recipes").doc(data.idMeal).set(data)
                .then(function (docRef) {
                    //console.log("Document written with ID: ", docRef.id);
                    resolve(docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }

    // Method to add Categories to DB

    static createNewCategory(data) {
        return new Promise(resolve => {
            this.db.collection('categories').doc(data.strCategory).set(data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", data.strCategory);
                    resolve(docRef);
            })
            .catch(function (error) {
                console.log("Error adding document: ", error);
            });
        });
    }

    // Method to add Recipes to DB

    static createRecipesFromCategories(data, mealId) {
        return new Promise(resolve => {
            this.db.collection('recipesFromCategories').doc(mealId).set(data)
            .then(function (docRef) {
                console.log("Document written with Name: ", mealId);
                resolve(docRef);
            })
            .catch(function (error) {
                console.log("Error adding document ", error);
            });
        });
    }

}