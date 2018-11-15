module.exports = {
    asyncMap: function (docs, db) {
        return new Promise(resolve => {
            Promise.all(docs.map(async (item) => {
                let myResponse = await this.getOneRequest(item.strCategory, db);
                if (myResponse.length) {
                    return item
                } else {
                    return false
                }
            })).then(data => resolve(data.filter(item => item)))
        });
    },

    getOneRequest: function (strCategorySearchValue, db) {
        return new Promise(resolve => {
            db.collection("recipes").find({strCategory: strCategorySearchValue}).toArray(function (err, docs) {
                resolve(docs);
            });
        })
    }
};