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
        this.db.settings({timestampsInSnapshots: true});
    }

    /*
    * This should return all collection
    * */
    static async getCollection(collection) {
        //let collectionLength = await this.getCollectionLength(collection);
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
            //example for search query
            //query = this.db.collection(collection).where('keywords', 'array-contains', 'bean').limit(10).get();
            query = this.db.collection(collection).limit(10).get();
        } else if (page > 1) {
            query = this.db.collection(collection).orderBy('strMeal').startAfter(this.lastRecipeDoc.id).limit(10).get()
        }

        return new Promise(resolve => {
            query.then((querySnapshot) => {
                const data = [];
                //const docData = [];
                querySnapshot.forEach((doc) => {
                    data.push({data: doc.data(), id: doc.id});
                    //docData.push({doc: doc});
                });
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


    //Method to get all Data from Categories collection

    static getCategories() {
        return new Promise(resolve => {
            this.db.collection('categories').get().then((snapShot) => {
                const data = []
                snapShot.forEach((doc) => {
                    data.push(doc.data().strCategory)
                })
                resolve(data)
            })
        })
    }

    // Method to search recipes by name

    static getRecipesByName(name) {
        return new Promise(resolve => {
            //let query = this.db.collection('recipes').where('keywords', 'array-contains', name).limit(10).get();
            let query = this.db.collection('recipes').where('keyWords', 'array-contains', name).limit(10).get();
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

    // Method to search recipes by name

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

    // Method to search meals by ID

    static getRecipeById(id) {
        return new Promise(resolve => {
            this.db.collection('recipes').get().then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().id === id) {
                        data.push({data: doc.data(), id: doc.id});
                    }
                });
                resolve(data);
            });
        });
    }
    // Method to get number recipes by Id
    static getRecipesById(quantity, id) {
        return new Promise(resolve => {
            this.db.collection('recipes').get().then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().id === id) {
                        data.push({data: doc.data(), id: doc.id});
                    }
                });
                resolve(data);
            });
        });
    }

    /*
    * Update new recipes
    * */
    static updateRecipe(data) {
        return new Promise(resolve => {
            this.db.collection("recipes").doc(data.strMeal).set(data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", data.id);
                    resolve(docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }

    /*
    * Create new recipes
    * @param data object which contains all recipe data
    * */
    static createNewRecipe(data) {
        console.log(data)
        return new Promise(resolve => {
            this.db.collection("recipes").doc(data.strMeal).set(data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", data.strMeal);
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

    //Method to get length of recipe DB
    static getCount() {
        return new Promise(resolve => {
            let data;
            this.db.collection('recipeCount').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        data = doc.data()
                    });
                    resolve(data)
                })
                .catch(error => {
                  console.log(error)
                });
        });
    }

    //

    static getCollectionFull(collection) {
        return new Promise(resolve => {
            const data = [];
            this.db.collection(collection).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });
                resolve(data)
            })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    //Method to update recipe counter
    static updateRecipeCounter(data) {
        return new Promise(resolve => {
            this.db.collection("recipeCount").doc('count').set(data)
                .then(function (docRef) {
                    console.log('Number of recipes in DB is now: ', data)
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