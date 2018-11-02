const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var express = require('express')
var app = express()
var db = null;
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/insertfrommealdb', function (req, res) {
    db.collection("recipes").insertOne(req.body).then((res, err)=>{
        console.log(res);
        console.log(err);
        res.send('{success: "success"}')
    })
})

app.get('/insert', function (req, res) {
    db.collection("insert").insertOne({insertColumn: 'asfdsadfasdfasdf'}).then((res, err)=>{
        console.log(res);
        console.log(err);
    })
    res.send('success')
})

app.get('/get/:some', function (req, res) {
    let param =  req.params.some;///.*m.*/
    db.collection("insert").find({insertColumn: new RegExp(param)}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        res.status(200);
        res.send(JSON.stringify(docs))
    });
})

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    app.listen(2000)
    //client.close();
});