const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())


client.connect();

// get all passowrds
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save a passowrd
app.post('/', async (req, res) => {
    const passowrd = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(passowrd);
    res.send({success:true,result:findResult})
})

// delete password by id
app.delete('/', async (req, res) => {
    const passowrd = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(passowrd);
    res.send({success:true,result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})