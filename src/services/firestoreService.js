/*
* References
* https://firebase.google.com/docs/web/setup?authuser=0
* https://firebase.google.com/docs/firestore/quickstart?authuser=0
* https://firebase.google.com/docs/firestore/query-data/get-data
* */
export default class {
    static initVal = '';
    static db;

    static init() {
        this.db = window.firebase.firestore();
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

    }

    static createNewRecipe(data) {
        return new Promise(resolve => {
            this.db.collection("recipes").add(data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }
}