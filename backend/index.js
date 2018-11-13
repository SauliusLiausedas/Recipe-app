const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var express = require('express')
var app = express()
var db = null;
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use((req, res, next) => { //doesn't send response just adjusts it

    res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over

})

app.post('/insertfrommealdb', function (req, response) {
    if (req.body && !req.body.idMeal){
        req.body.idMeal = parseInt(Math.random(new Date().getTime())*10000000);
    }
    db.collection("recipes").insertOne(req.body).then((res, err) => {
        console.log(response);
        console.log(err);
        response.send('{success: "success"}')
    })
})

app.put('/updateRecipe', function (req, response) {
    let updatedRecipe = req.body;
    delete updatedRecipe._id;
    db.collection("recipes").update({idMeal: updatedRecipe.idMeal}, updatedRecipe, {upsert: true}, function (err, docs) {
        console.log(response);
        console.log(err);
        response.send('{success: "success"}')
    });
})

app.post('/insertcategories', function (req, response) {
    db.collection("categories").insertOne(req.body).then((res, err) => {
        console.log(res);
        console.log(err);
        response.send('{success: "success"}')
    })
})

app.get('/insert', function (req, res) {
    db.collection("insert").insertOne({insertColumn: 'asfdsadfasdfasdf'}).then((res, err) => {
        console.log(res);
        console.log(err);
    })
    res.send('success')
})

app.get('/getById/:id', function (req, response) {
    const id = req.params.id;
    db.collection("recipes").find({idMeal: id}).toArray(function (err, docs) {
        response.status(200);
        response.send(JSON.stringify(docs))
    });
})

app.get('/get/:some', function (req, res) {
    let param = req.params.some;
    db.collection("insert").find({insertColumn: new RegExp(param)}).find().toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

app.get('/searchrecipe/:searchValue/:itemsPerPage/:pageNumber', function (req, res) {
    let searchValue = req.params.searchValue;
    let itemsPerPage = parseInt(req.params.itemsPerPage);
    let pageNumber = parseInt(req.params.pageNumber);
    let query = {
        $or: [
            {strInstructions: new RegExp(searchValue)},
            {strMeal: new RegExp('chicken')}
        ]
    };
    db.collection("recipes").find(query).skip(itemsPerPage * (pageNumber - 1)).limit(itemsPerPage).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

app.get('/getallrecipes/:itemsPerPage/:pageNumber', function (req, res) {
    let itemsPerPage = parseInt(req.params.itemsPerPage);///.*m.*/
    let pageNumber = parseInt(req.params.pageNumber);
    db.collection("recipes").find({}).skip(itemsPerPage * (pageNumber - 1)).limit(itemsPerPage).toArray(function (err, docs) {
        //db.collection("recipes").update()
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

app.get('/getrecipescount', function (req, res) {
    db.collection("recipes").count().then((data) => {
        res.send(JSON.stringify(data))
    })
})

    // METHOD TO GET CATEGORIES

app.get('/getcategories', function(req, res) {
    db.collection('categories').find({}).toArray(function (err, docs) {
        let give = []
        docs.forEach(async (doc, i) => {
            //  await db.collection('recipes').find({}).count(function(err, send) {
            // })
            let myResponse = await getOneRequest(doc.strCategory)
            if (myResponse.length) {
                give.push(myResponse)
            }
        })
        console.log(docs)
        res.status(200)
        res.send(JSON.stringify(give))
    })
})

function getOneRequest() {
    return new Promise(resolve => {
        db.collection('recipes').find({strCategory: doc.strCategory}.toArray(function(err, docs) {
            resolve(docs)
        }))
    })
}
    // Method to get category meals

app.get('/getselectedcategory/:category', function(req, res) {
    let category = req.params.category
// db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )
    let fieldselector = {strCategory: true, idMeal: true, strMeal: true, strMealThumb: true, _id: false}
    db.collection('recipes').find({'strCategory' : category}).project(fieldselector).toArray(function(err, docs) {
    console.log('Categories')
    console.log(docs)
    res.status(200)

    res.send(JSON.stringify(docs))
    })
})

// Get random quantity of random recipes

app.get('/getrandomrecipe/:recipeCount', function(req, res) {
    recipeToGet = (parseInt(req.params.recipeCount))
// db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )
    db.collection('recipes').find({}).skip(recipeToGet).limit(1).toArray(function(err, docs) {
        console.log('recipes')
        console.log(docs)
        res.status(200)
        res.send(JSON.stringify(docs))
    })
})

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    app.listen(2000)
    //client.close();
});