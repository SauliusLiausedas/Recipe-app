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
        this.db.settings({ timestampsInSnapshots: true});
        console.log(window.firebase)
    }

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
    static createNewCategory(data) {
        return new Promise(resolve => {
            this.db.collection("categories").doc(data.strCategory).set(data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", data.strCategory);
                    resolve(docRef);
            })
            .catch(function (error) {
                console.log("Error adding document: ", error);
            });
        });
    }

}