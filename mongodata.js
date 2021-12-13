const express = require('express') //to include express module
const MongoClient = require('mongodb').MongoClient //connect to mongodb by creating a mongoclient instance

const app = express() //creating a express application

app.use(express.json()) //middleware will return type json

var database

app.get('/', (req, resp) => { //to check working of api
    resp.send('welcome to mongodb api')
})
app.get('/api/cricketinfo', (req, resp) => {
    database.collection('cricdata').find({}).toArray((err, result) => { //creating a endpoint
        if (err) throw err
        resp.send(result)
    })
})

app.listen(8080, () => { //creating a mongodb connection at port 8080
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },
        (error, result) => {
            if (error) throw error
            database = result.db('cricket_database') //to connect to db and fetch
            console.log('connection successful')
        }
    )
})